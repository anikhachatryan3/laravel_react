<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Validator;

class LoginController extends Controller {

    // function to log user in
    public function index(Request $request) {
        // $validator = Validator::validate($request, [
        //     'email' => 'required|email|string|exists:users,email',
        //     'password' => 'required|string',
        // ]);

        $request->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();
        if($user) {
            if(Hash::check($request->password, $user->password)) {
                Auth::login($user);
                return response()->json([
                    'user' => $user,
                ], 200);
            }
            else {
                return response()->json([
                    'error' => 'Email or password is incorrect',
                ], 404);
            }
        }
        else {
            return response()->json([
                'error' => 'Email or password is incorrect',
            ], 404);
        }
    }
}
