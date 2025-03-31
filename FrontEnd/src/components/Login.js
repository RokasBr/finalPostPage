import React, { useRef, useState } from "react";
import http from "../plugins/https"
import {useNavigate} from "react-router-dom";
import mainStore from "../store/main";

const Login = ({socket}) => {

    const nav = useNavigate()
    const {setUser} = mainStore(state => state)


    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            setError("All fields are required");
            return;
        }

        const res = await http.post("http://localhost:2002/login", { username, password })

        console.log(res)
        if(res.success) {
            console.log("Login Response:", res);
            socket.emit("login", res.user.username)
            localStorage.setItem("token", res.token)
            setUser(res.user)
            nav("/home")

        }

    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h2>User Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input ref={usernameRef} type="text" placeholder="Username" style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }} />
            <input ref={passwordRef} type="password" placeholder="Password" style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }} />
            <button onClick={handleSubmit} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Login</button>
        </div>
    );
};

export default Login;
