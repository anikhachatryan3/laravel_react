<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class CreateAccountController extends Controller {

    // function to create a new account
    public function index(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => 'required|string',
        ]);

        $password = Hash::make($request->password);
        $user = User::firstOrCreate(['email' => $request->email], ['name' => $request->name, 'password' => $password]);
        if($user) {
            Auth::login($user);
            return response()->json([
                'user' => $user,
            ], 200);
        }
        else {
            return response()->json([
                'error' => 'Email is already in use.',
            ], 404);
        }
    }
}
