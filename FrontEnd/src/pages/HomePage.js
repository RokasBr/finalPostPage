import React from "react";
import Toolbar from "../components/Toolbar";
import AllPosts from "../components/AllPosts"; // Import AllPosts component

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Toolbar />
            <AllPosts />
        </div>
    );
};

export default HomePage;