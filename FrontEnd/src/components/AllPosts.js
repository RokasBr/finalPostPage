import React, { useEffect, useState } from "react";
import http from "../plugins/https";
import SinglePost from "../components/SinglePost";

const AllPosts = ({posts: favoritePosts }) => {
    const [posts, setPosts] = useState([]);
    // const [isFav, setIsFav] = useState(0);
    useEffect(() => {
        console.log('veik')
        console.log('favys' ,favoritePosts);
        if(favoritePosts && favoritePosts.length > 0) {
            console.log('favoritePosts in allposts', favoritePosts);
            setPosts(favoritePosts);
            // setIsFav(1);
        }
        else{
            http.get("http://localhost:2002/posts")
                .then(res => {
                    console.log("posts: ", res);
                    setPosts(res.posts);
                });
        }

    }, []);

    async function deletePost(post) {
        const res = await http.get("http://localhost:2002/remove/" + post._id);
        setPosts(res.posts);
    }

    async function updatePost(post) {
        const res = await http.post("http://localhost:2002/update", post);
        setPosts(res.posts);
    }

    return (
        <div className="d-flex wrap gap-2">
            {posts.map((x) => (
                <SinglePost remove={deletePost} update={updatePost} key={x._id} post={x} isFav={0}/>
            ))}
        </div>
    );
};

export default AllPosts;