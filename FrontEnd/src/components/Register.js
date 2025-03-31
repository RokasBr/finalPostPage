import React, { useRef, useState } from "react";
import http from "../plugins/https";

const Register = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (!username || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const res = await http.post("http://localhost:2002/register", { username, password })
        console.log(res)
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h2>User Registration</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input ref={usernameRef} type="text" placeholder="Username" style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }} />
            <input ref={passwordRef} type="password" placeholder="Password" style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }} />
            <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }} />
            <button onClick={handleSubmit} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>Register</button>
        </div>
    );
};

export default Register;
