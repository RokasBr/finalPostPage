import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import http from "../plugins/https";
import mainStore from "../store/main";
import "../App.css";
import Toolbar from "../components/Toolbar";
import format from "date-fns/format";

const SinglePostPage = () => {
    const { post_id } = useParams();
    const { user } = mainStore(state => state);
    const [post, setPost] = useState(null);
    const [commentText, setCommentText] = useState("");
    const commentInputRef = useRef(null);

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        const res = await http.get(`http://localhost:2002/post/${post_id}`);
        if (res.success) setPost(res.post);
        console.log('post', post);
    };

    const addComment = async () => {
        if (!commentText) return;

        const res = await http.post(`http://localhost:2002/post/${post_id}/comment`, { text: commentText }, {
            headers: { Authorization: localStorage.getItem("token") }
        });

        if (res.success) {
            setPost({ ...post, comments: res.comments });
            setCommentText("");
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-container">
            <Toolbar />
            <div className="d-flex">
                <div>
                    <img src={post.image} alt="Post" />
                </div>
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p>Owner: {post.owner}</p>
                    <p>Posted on: {post.createdAt ? format(new Date(post.createdAt), "yyyy-MM-dd HH:mm") : "Unknown"}</p>
                </div>
            </div>



            <div className="comments-section">
                <h3>Comments</h3>
                {post.comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <strong>{comment.user}</strong>: {comment.text}
                    </div>
                ))}
            </div>

            {user && (
                <div className="comment-box">
                    <input
                        ref={commentInputRef}
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button onClick={addComment}>Post Comment</button>
                </div>
            )}
        </div>
    );
};

export default SinglePostPage;
