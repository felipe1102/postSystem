<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'message' => "Post encontrados",
            'data' => Post::orderBy('id', 'DESC')->get()
        ], 201);
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
            'title' => 'required|string',
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
            $newPost = Post::create([
                "id_user" => Auth::user()->id,
                "title" => $request->title,
                "description" => $request->description
            ]);
            DB::commit();
            return response()->json([
                'message' => "Post criado com sucesso",
                'data' => $newPost
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
        $post = Post::find($id);
        if (!$post){
            return response()->json([
                'message' => "Post não encontrado",
                'error' => "Erro"
            ], 404);
        }
        return response()->json([
            'message' => "Post encontrado com sucesso",
            'data' => $post
        ], 201);

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
