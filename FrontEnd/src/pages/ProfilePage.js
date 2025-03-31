import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../plugins/https";
import useStore from "../store/main";
import "../App.css";
import Toolbar from "../components/Toolbar";

const ProfilePage = () => {
    const navigate = useNavigate();

    // Local state for fetched user data
    const { setUser: setStoreUser } = useStore();
    const [user, setUser] = useState(null);
    // Separate state for input fields (draft values)
    const [photoInput, setPhotoInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    // Fetch user from backend
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await http.get("http://localhost:2002/getUser");
                if (res.success) {
                    console.log('got user', res);
                    setUser(res.user);
                } else {
                    alert(res.message || "Failed to fetch user");
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                navigate("/");
            }
        }

        fetchUser();
    }, [navigate]);

    // Change Photo
    const changePhoto = async () => {
        if (!photoInput.trim()) return;
        try {
            console.log('photo', photoInput)
            const res = await http.post("http://localhost:2002/update-profile", { photoURL: photoInput });
            if (res.success) {
                console.log('resp',res)
                setUser(res.user);     // update local user state
                setStoreUser(res.user);
                setPhotoInput(res.user.profileImage); // update the draft state
                alert("Photo updated successfully!");
            } else {
                alert(res.message || "Error updating photo");
            }
        } catch (error) {
            console.error("Error updating photo:", error);
            alert("Error updating photo");
        }
    };


    // Change Username
    const changeUsername = async () => {
        if (!usernameInput.trim()) return;
        try {
            const res = await http.post("http://localhost:2002/update-profile", { username: usernameInput });
            if (res.success) {
                setUser(res.user);
                setStoreUser(res.user);
                setUsernameInput(res.user.username); // update the draft state
                alert("Username updated successfully!");
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error("Error updating username:", error);
            alert("Error updating username");
        }
    };


    // Change Password
    const changePassword = async () => {
        if (!password1.trim() || !password2.trim()) {
            alert("Please fill both password fields.");
            return;
        }
        if (password1 !== password2) {
            alert("Passwords do not match.");
            return;
        }
        try {
            const res = await http.post("http://localhost:2002/update-profile", { password: password1 });
            if (res.success) {
                setStoreUser(res.user);
                setPassword1("");
                setPassword2("");
                alert("Password changed successfully!");
            } else {
                alert(res.message || "Error updating password");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Error updating password");
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-page">
            <Toolbar />
            <h1>Profile Page</h1>
            <div className="profile-container">
                {/* Left Column: Profile Image */}
                <div className="left-col">
                    <img src={user.profileImage || "https://via.placeholder.com/150"} alt="Profile" className="profile-image" />
                    <p className="profile-username">Username: {user.username}</p>
                </div>

                {/* Right Column: Change Forms */}
                <div className="right-col">
                    {/* Change Photo */}
                    <div className="change-section">
                        <label>Change Photo URL</label>
                        <input
                            type="text"
                            value={photoInput}
                            onChange={(e) => setPhotoInput(e.target.value)}
                            placeholder="New photo URL"
                        />
                        <button onClick={changePhoto}>Change Photo</button>
                    </div>

                    {/* Change Username */}
                    <div className="change-section">
                        <label>Change Username</label>
                        <input
                            type="text"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            placeholder="New username"
                        />
                        <button onClick={changeUsername}>Change Username</button>
                    </div>

                    {/* Change Password */}
                    <div className="change-section">
                        <label>Change Password</label>
                        <input
                            type="password"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            placeholder="New password"
                        />
                        <input
                            type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder="Confirm password"
                        />
                        <button onClick={changePassword}>Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
