<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::prefix('v1')->group(function () {
    Route::post("/user", [UserController::class, 'store']);
    Route::post("/login", [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::prefix('post')->group(function () {
            Route::get('/', [PostController::class, 'index']);
            Route::post('/', [PostController::class, 'store']);
            Route::get('/{id}', [PostController::class, 'show']);
        });
        Route::prefix('comment')->group(function () {
            Route::post('/', [CommentsController::class, 'store']);
        });
        Route::put("/user/{id}", [UserController::class, 'update']);
        Route::delete("/logout", [AuthController::class, 'logout']);
    });
});
