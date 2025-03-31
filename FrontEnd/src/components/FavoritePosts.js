import React, { useEffect, useState } from "react";
import http from "../plugins/https";
import SinglePost from "../components/SinglePost";
const FavoritePosts = ({posts: favoritePosts, setFavoritePosts}) => {
    const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     http.get("http://localhost:2002/favorites")
    //         .then(res => {
    //             console.log('favorites', res);
    //             setPosts(res.posts);
    //         });
    //
    // }, []);

    // async function deletePost(post) {
    //     const res = await http.get("http://localhost:2002/remove/" + post._id);
    //     setPosts(res.posts);
    // }
    //
    // async function updatePost(post) {
    //     const res = await http.post("http://localhost:2002/update", post);
    //     setPosts(res.posts);
    // }

    function removeFromFavorites(postId) {
        // Instantly remove the post from the list without refreshing
        setFavoritePosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    }

    return (
        <div className="d-flex wrap gap-2">
            {favoritePosts.map((x) => (
                <SinglePost
                            key={x._id}
                            post={x}
                            isFav={1}
                            removeFromFavorites={removeFromFavorites}
                />
            ))}
        </div>
    );
};

export default FavoritePosts;