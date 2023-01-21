import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Home.css';

import PostObject from '../types/PostObject';
import Post from '../components/Post';

// interface PostObject {
//     id: Number;
//     title: string;
//     description: string;
//     user_id: Number;
// }

const Home = () => {
    const [posts, setPosts] = useState<PostObject[]>([]);
    const [visible, setVisible] = useState(Boolean);
    const [hideButton, setHideButton] = useState(Boolean);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function openForm() {
        setVisible(true);
        setHideButton(true);
    }

    function closeForm() {
        setVisible(false);
        setHideButton(false);
    }

    function submitForm() {
        axios.post(`http://127.0.0.1:8000/api/posts`, {
            title: title,
            description: description,
            user_id: 1
        })
        .then(response => {
            let post = response.data.post;
            setPosts([post, ...posts]);
            setTitle("");
            setDescription("");
            console.log("Response: ", response);
        })
        .catch(error => {
            console.log("ERROR: ", error);
        })
        
        setVisible(false);
        setHideButton(false);
    }

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.currentTarget.value);
    }

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
            <div>
                { !hideButton &&
                    <button className="createPost" onClick={() => openForm()}>Create Post</button>
                }
            </div>
            { visible &&
            <div className="formPopup" id="createPostForm">
                <form  className="form">
                    <h3 className="formTitle">Create Post</h3>
                    <label>
                        <b>
                            Title:&nbsp;
                        </b>
                    </label>
                    <input type="text" name="title" onChange={changeTitle} required/>
                    <br />
                    <label>
                        <b>
                            Description:&nbsp;
                        </b>
                    </label>
                    <textarea name="description" rows={3} cols={40} onChange={changeDescription} required></textarea>
                    <br />
                    <button type="button" className="submitPost" onClick={() => submitForm()}>Submit</button>
                    <button type="button" className="closeButton" onClick={() => closeForm()}>Close</button>
                </form>
            </div>
            }
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
