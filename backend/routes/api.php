<?php

use App\Http\Controllers\CreateAccountController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts', [PostController::class, 'index'])->name('all-posts');
Route::get('/{user}/posts', [PostController::class, 'myPosts'])->name('my-posts');
Route::get('/posts/{post}', [PostController::class, 'getPost'])->name('get-post');
Route::delete('/posts/{post}', [PostController::class, 'deletePost'])->name('delete-post');
Route::post('/posts', [PostController::class, 'createPost'])->name('create-post');
Route::post('/login', [LoginController::class, 'index'])->name('login');
Route::post('/create-account', [CreateAccountController::class, 'index'])->name('create-account');
