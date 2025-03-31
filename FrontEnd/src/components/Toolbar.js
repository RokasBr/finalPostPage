import React from 'react';
import { Link } from "react-router-dom";
import mainStore from "../store/main";
import '../App.css'; // Import the CSS file

const Toolbar = () => {
    const { user } = mainStore(state => state);

    return (
        <div className="toolbar">  {/* Apply the toolbar class */}
            <div className="nav-links">  {/* Apply the nav-links class */}
                <Link to="/home">Home</Link>
                {user?.username ? (
                        <Link to={`/profile/${user.username}`}>Profile</Link>) :
                    (<Link to="/">Profile</Link>)}
                <Link to="/create">Create Post</Link>
                <Link to="/messages">Messages</Link>
                <Link to="/favorites">Favorites</Link>
            </div>

            {user?.username && (
                <div className="user-info"> {/* Apply the user-info class */}
                    Logged in as: <b>{user.username}</b>
                </div>
            )}
        </div>
    );
};

export default Toolbar;
