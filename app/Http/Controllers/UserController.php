<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
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
            "name" => 'required|string',
            "email" => 'required|email|unique:users',
            "password" => 'required|string|min:8',
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
            $request['password'] = Hash::make($request->password);
            $user = User::create($request->all());
            DB::commit();
            return response()->json([
                'message' => 'Usuário cadastrado com sucesso',
                'data' => $user
            ], 201);
        }catch (\Exception $error){
            DB::rollBack();
            return response()->json([
                'message' => "Erro ao cadastrar um usuário",
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
        $user = User::find($id);
        if (!$user){
            return response()->json([
                'message' => 'Erro ao buscar usuário',
                'error' => 'Usuário não encontrado'
            ], 404);
        }
        return response()->json([
            'message' => 'Usuário encontrado',
            'data' => $user
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
        $validator = Validator::make($request->all(), [
            "name" => 'required|string',
            "email" => 'required|email|unique:users,email,'.$id,
            "password" => 'nullable|string|min:8',
        ]);
        if ($validator->fails()) {
            $errorValidator = $validator->messages();
            return response()->json([
                'message' => 'Dados inválidos',
                'error' => $errorValidator->first()
            ], 400);
        }
        if($request->password) {
            $request['password'] = Hash::make($request->password);
        }
        DB::beginTransaction();
        try{
            $user = User::findOrFail($id);
            $user->update($request->all());
            DB::commit();
            return response()->json([
                'message' => 'Usuário atualizado com sucesso',
                'data' => $user
            ]);
        }catch (\Exception $error){
            DB::rollBack();
            return response()->json([
                'message' => "Erro ao cadastrar um usuário",
                'error' => $error->getMessage()
            ], 400);
        }
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
