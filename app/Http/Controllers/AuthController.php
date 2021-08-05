<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
            "email" => "required",
            "password" => "required|string"
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Error in Login',
                'error' => 'Usuário ou senha incorretos'
            ], 401);
        }
        $token = $user->createToken('token')->plainTextToken;
        return response()->json([
            'message' => 'Login realizado com sucesso',
            'data' => [
                'user'=> $user,
                'token' => $token
            ]
        ], 201);
    }

    public function logout(){
        $user = request()->user();
        $user->tokens()->delete();
        //$user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

        return response()->json([
            'message' => 'Usuário deslogado',
        ], 201);
    }
}
