import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/main";
import http from "../plugins/https";
import Toolbar from "../components/Toolbar";

const CreatePostPage = () => {
    const { user } = useStore();
    const nav = useNavigate();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const imageRef = useRef();

    if (!user) {
        nav("/login");
        return null;
    }

    async function createPost() {
        const data = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            image: imageRef.current.value,
            owner: user.username,
            createdAt: new Date().toISOString()
        };
        console.log("user " + user.username);
        console.log('time', data);
        const res = await http.post("http://localhost:2002/create", data);

        if (res.success) {
            nav("/home");
        }
    }

    return (
        <div>
            <Toolbar />
            <div className="d-flex gap-2 flex-wrap">
                <input type="text" ref={titleRef} placeholder="Title" />
                <input type="text" ref={descriptionRef} placeholder="Description" />
                <input type="text" ref={imageRef} placeholder="Image URL" />
                <button onClick={createPost}>Create</button>
            </div>
        </div>

    );
};

export default CreatePostPage;
