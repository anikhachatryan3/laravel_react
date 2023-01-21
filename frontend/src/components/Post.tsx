import moment from "moment";
import "moment-timezone";
// import React from "react";
// import Moment from "react-moment";
import PostObject from '../types/PostObject';

interface Props {
    post: PostObject;
}

function Post({post}: Props) {

    return (
        <>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div>{post.user.name}</div>
            <div>{moment(post.created_at).format('MMMM Do YYYY, h:mm a')}</div>
            <br />
            {/* { <div>Posted on&nbsp; 
                <Moment format="MMMM Do, YYYY [ at ] H:MM a">{post.created_at}</Moment>
                
           </div> } */}
        </>
    );
}

export default Post;
