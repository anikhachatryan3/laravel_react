import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Home.css';

import PostObject from '../types/PostObject';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';

const Home = () => {
    const [posts, setPosts] = useState<PostObject[]>([]);

    function fetchPosts() {
        axios.get(`http://127.0.0.1:8000/api/posts`)
        .then((response) => {
        // console.log("DATA:", response);
        setPosts(response.data.posts);
        })
        .catch((error) => {
        console.log("ERROR: ", error);
        setPosts([]);
        });
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
    <> 
        <header className="App-header">
            <h1>HOME</h1>
        </header>
        <main>
            <CreatePost posts={posts} setPosts={setPosts} />
            <div>
                {posts.map((post, id) => (
                    <div key={id} className="posts">
                        <Post post={post} />
                    </div>
                ))
                }
            </div>
        </main>
    </>
  );
}

export default Home;
