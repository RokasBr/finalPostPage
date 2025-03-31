import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../plugins/https";
import SinglePost from "../components/SinglePost";
import Toolbar from "../components/Toolbar";
import mainStore from "../store/main";

const SingleUserPage = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const {user:loggedUser } = mainStore(state => state);

    useEffect(() => {
        // console.log('sotred', loggedUser);
        http.get(`http://localhost:2002/user/${username}`)
            .then(res => {
                if (res.success) {
                    setUser(res.user);
                }
            });

        http.get(`http://localhost:2002/user/${username}/posts`)
            .then(res => {
                if (res.success) {
                    setPosts(res.posts);
                }
            });

        http.get(`http://localhost:2002/user/${loggedUser.username}`)
            .then(res => {
                if (res.success) {
                    setCurrentUser(res.user);
                }
            });
    }, [username, loggedUser?.username]);

    const sendMessage = async () => {
        if (!message.trim()) return alert("Message cannot be empty!");

        try {
            const res = await http.post("http://localhost:2002/messages/send", {
                recipient: user._id,
                text: message
            });

            if (res.success) {
                alert("Message sent!");
                setMessage("");
            } else {
                alert("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-5">
            <Toolbar />
            <div className="user-info border p-3 mb-4">
                <img src={user.profileImage || "default-avatar.png"} alt="Profile" className="profile-pic"/>
                <h2>{user.username}</h2>
            </div>

            {currentUser && currentUser.username !== user.username && (
                <div className="messages-section border p-3 mb-4">
                    <h3>Send a Message</h3>
                    <textarea
                        placeholder="Write a message..."
                        className="w-100 p-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button className="btn btn-primary mt-2" onClick={sendMessage}>Send</button>
                </div>
            )}

            <h3>{user.username}'s Posts</h3>
            <div className="d-flex flex-wrap gap-2">
                {posts.length > 0 ? posts.map(post => (
                    <SinglePost key={post._id} post={post} isFav={false} />
                )) : <p>No posts yet.</p>}
            </div>
        </div>
    );
};

export default SingleUserPage;
