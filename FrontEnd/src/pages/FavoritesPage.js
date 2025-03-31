import React, { useEffect, useState } from 'react';
import Toolbar from "../components/Toolbar";
import FavoritePosts from "../components/FavoritePosts"; // Import the correct component

const FavoritesPage = () => {
    const [favoritePosts, setFavoritePosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2002/favorites", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log('favs', data);
                    setFavoritePosts(data.favorites); // Set favorite posts in state
                }
            })
            .catch(err => console.error("Error fetching favorites:", err));
    }, []);

    return (
        <div>
            <h1>Favorites</h1>
            <Toolbar />

            {favoritePosts.length > 0 ? (
                <FavoritePosts posts={favoritePosts} setFavoritePosts={setFavoritePosts} />
            ) : (
                <p>No favorite posts yet.</p>
            )}
        </div>
    );
};

export default FavoritesPage;
