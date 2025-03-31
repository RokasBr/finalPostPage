import React, {useEffect, useRef, useState} from 'react';
import format from 'date-fns/format';
import mainStore from "../store/main";
import {Link} from "react-router-dom";
import '../App.css'; // Import the CSS file

const SinglePost = ({post, remove, update, isFav, removeFromFavorites}) => {
    const {user} = mainStore(state => state)
    const [isFavorite, setIsFavorite] = useState(false);

    const titleRef = useRef()
    const descriptionRef = useRef()
    const imageRef = useRef()

    const [edit, setEdit] = useState(false)

    useEffect(() => {

        if(edit) {
            titleRef.current.value = post.title
            descriptionRef.current.value = post.description
            imageRef.current.value = post.image
        }

    }, [edit])

    // useEffect(() => {
    //     // Check if post is in favorites when the component loads
    //     console.log("Auth Token:", localStorage.getItem("token"));
    //     fetch("http://localhost:2002/favorites", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: localStorage.getItem("token")
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log("Fetched favorites:", data); // 🔍 Debug log
    //             if (data.success && Array.isArray(data.favorites)) {
    //                 setIsFavorite(data.favorites.includes(post._id));
    //             }
    //         })
    //         .catch(err => console.error("Error fetching favorites:", err));
    // }, [post._id]);

    function updatePost() {
        const data = {
            id: post._id,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            image: imageRef.current.value
        }

        setEdit(false)
        update(data)
    }

    function toggleFavorite() {
        const url = isFav
            ? "http://localhost:2002/favorites/remove"
            : "http://localhost:2002/favorites/add";

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
            <p>Owner: <Link to={`/user/${post.owner}`}>{post.owner}</Link></p>
            <button onClick={toggleFavorite} className={isFavorite ? "favorite active" : "favorite"}>
                {
                    isFav ? "Remove from Favorites" : "Add to Favorites"
                }
            </button>

        </div>
    );
};

export default SinglePost;