<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'post_id' => 'required|exists:posts,id',
            'description' => 'required|string',
        ]);
        if ($validator->fails()) {
            $errorValidator = $validator->messages();
            return response()->json([
                'message' => 'Dados inválidos',
                'error' => $errorValidator->first()
            ], 400);
        }
        DB::beginTransaction();
        try{
            $newComment = Comment::create([
                "id_post" => $request->post_id,
                "id_user" => Auth::user()->id,
                "description" => $request->description,
            ]);
            DB::commit();
            return response()->json([
                'message' => "Comentario criado com sucesso",
                'data' => $newComment
            ], 201);
        }catch (\Exception $error){
            DB::rollBack();
            return response()->json([
                'message' => "Erro ao cadastrar um post",
                'error' => $error->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
