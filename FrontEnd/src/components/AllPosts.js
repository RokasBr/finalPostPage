import React, { useEffect, useState } from "react";
import http from "../plugins/https";
import SinglePost from "../components/SinglePost";

const AllPosts = ({posts: favoritePosts }) => {
    const [posts, setPosts] = useState([]);
    // const [isFav, setIsFav] = useState(0);
    useEffect(() => {
        if(favoritePosts && favoritePosts.length > 0) {
            setPosts(favoritePosts);
            // setIsFav(1);
        }
        else{
            http.get("http://localhost:2002/posts")
                .then(res => {
                    // console.log("posts: ", res);
                    setPosts(res.posts);
                });
        }

    }, []);

    async function deletePost(post) {
        const res = await http.get("http://localhost:2002/remove/" + post._id);
        setPosts(res.posts);
    }

    return (
        <div className="d-flex wrap gap-2">
            {posts.map((x) => (
                <SinglePost remove={deletePost} key={x._id} post={x} isFav={0}/>
            ))}
        </div>
    );
};

export default AllPosts;