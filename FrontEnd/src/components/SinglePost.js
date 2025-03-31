import React, {useState} from 'react';
import format from 'date-fns/format';
import mainStore from "../store/main";
import {Link} from "react-router-dom";
import '../App.css';

const SinglePost = ({post, isFav, removeFromFavorites}) => {
    const {user} = mainStore(state => state)
    const [isFavorite, setIsFavorite] = useState(false);


    function toggleFavorite() {
        const url = "http://localhost:2002/favorites/add";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            },
            body: JSON.stringify({ userId: user._id, postId: post._id })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data)
                    setIsFavorite(!isFav);
                    if (isFav && removeFromFavorites) {
                        removeFromFavorites(post._id);
                    }
                }
            })
            .catch(err => console.error("Error updating favorites:", err));
    }

    return (
        <div className="p-2 border post">

            <Link to={`/post/${post._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={post.image} alt="" />
                <h2>{post.title}</h2>
                <p>{post.description}</p>

                <p>Posted on: {post.createdAt ? format(new Date(post.createdAt), "yyyy-MM-dd HH:mm") : "Unknown"}</p>
            </Link>
            <p className="highlight-owner">
                Owner: <Link to={`/user/${post.owner}`}>{post.owner}</Link>
            </p>
            <button onClick={toggleFavorite} className={isFavorite ? "favorite active" : "favorite"}>
                {
                    isFav ? "Remove from Favorites" : "Add to Favorites"
                }
            </button>

        </div>
    );
};

export default SinglePost;