import React, { useEffect, useState } from "react";
import axios from "axios";
import './CreatePost.css';

interface Props {
    posts: any;
    setPosts: any;
}

const CreatePost = ({posts, setPosts}: Props) => {
    const [visible, setVisible] = useState(Boolean);
    const [hideButton, setHideButton] = useState(Boolean);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [disableButton, setDisableButton] = useState(Boolean);

    function openForm() {
        setVisible(true);
        setHideButton(true);
        setDisableButton(true);
    }

    function closeForm() {
        setVisible(false);
        setHideButton(false);
        setDisableButton(true);
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

    useEffect(() => {
        const handleDisable = () => {
            if(title.trim().length > 0 && description.trim().length > 0) {
                setDisableButton(false);
            }
            else {
                setDisableButton(true);
            }
        }
        handleDisable();
    }, [title, description]);

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.currentTarget.value);
    }

    return (
        <>
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
                    <button type="button" className="submitPost" onClick={() => submitForm()} disabled={disableButton}>Submit</button>
                    <button type="button" className="closeButton" onClick={() => closeForm()}>Close</button>
                </form>
            </div>
        }
        </>
    );
}

export default CreatePost;
