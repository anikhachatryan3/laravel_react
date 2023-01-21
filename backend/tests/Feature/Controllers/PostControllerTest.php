<?php

namespace Tests\Feature\Controllers;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Post;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testIndex() {
        $this->get(route('all-posts'))->assertStatus(200);
    }

    public function testMyPosts() {
        $this->get(route('my-posts', [
            'user' => 1
        ]))->assertStatus(200);
    }

    public function testCreatePost() {
        $this->post(route('create-post', [
            'title' => 'Testing',
            'description' => 'testing 123',
            'user_id' => 1,
        ]))->assertStatus(201);
        
        $this->assertDatabaseHas('posts', [
            'title' => 'Testing',
            'description' => 'testing 123',
            'user_id' => 1,
        ]);

        $this->post(route('create-post', [
            'title' => 'Title',
            'description' => 'a description',
            'user_id' => 3,
        ]))->assertStatus(422);

    }

    public function testDeletePost() {
        $post = Post::factory()->create([
            'user_id' => 1,
        ]);

        $this->delete(route('delete-post', [
            'post' => $post->id
        ]))->assertStatus(200);

        $this->assertDatabaseMissing('posts', [
            'id' => $post->id
        ]);

        $this->delete(route('delete-post', [
            'post' => $post->id
        ]))->assertStatus(404);
    }

    public function testGetPost() {
        $this->get(route('get-post', [
            'post' => 1
        ]))->assertStatus(200);
    }

}
