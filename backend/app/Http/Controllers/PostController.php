<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    // method to get all posts with user attached
    public function index() {
        $posts = Post::with(['user'])->orderBy('id', 'desc')->get();
        // return $posts;
        return response()->json([
            'posts' => $posts
        ], 200);
    }

    // method to get all posts of logged in user
    public function myPosts(User $user) {
        $posts = Post::with(['user'])->where('user_id', $user->id)->orderBy('id', 'desc')->get();
        // $posts = $user->posts;
        return response()->json([
            'posts' => $posts
        ], 200);
    }

    // method to create and store specific post
    public function createPost(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:255|string',
            'description' => 'required|max:65000|string',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        if($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }

        // $request->validate([
        //     'title' => 'required|max:255|string',
        //     'description' => 'required|max:65000|string',
        //     'user_id' => 'required|integer|exists:users,id',
        // ]);

        $post = new Post;
        $post->title = $request->title;
        $post->description = $request->description;
        $post->user_id = $request->user_id;
        $post->user;

        if($post->save()) {
            return response()->json([
                'post' => $post
            ], 201);
        }
        else {
            return response()->json([
                'error' => 'Could not save post.'
            ], 422);
        }

    }

    // method to delete specific post
    public function deletePost(Post $post) {
        if($post->delete()) {
            return response()->json('success', 200);
        }
        else {
            return response()->json('error', 422);
        }
    }

    // method to get specific post
    public function getPost(Post $post) {
        $post->user;
        return response()->json([
            'post' => $post
        ], 200);
    }
}
