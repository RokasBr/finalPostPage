// import React, {useEffect, useRef, useState} from 'react';
// import mainStore from "../store/main"
// import http from "../plugins/https"
// import {useNavigate} from "react-router-dom";
//
// const IndexPage = () => {
//     const nav = useNavigate()
//
//     const titleRef = useRef()
//     const descriptionRef = useRef()
//     const imageRef = useRef()
//
//
//     async function create() {
//         const data = {
//             title: titleRef.current.value,
//             description: descriptionRef.current.value,
//             image: imageRef.current.value
//         }
//
//         const res = await http.post("http://localhost:2002/create", data)
//
//
//         if(res.success) {
//             nav("/posts")
//         }
//
//         console.log(res)
//     }
//
//     return (
//         <div className="d-flex gap-2 flex-wrap">
//
//             <input type="text" ref={titleRef} placeholder="title"/>
//             <input type="text" ref={descriptionRef} placeholder="description"/>
//             <input type="text" ref={imageRef} placeholder="image"/>
//
//             <button onClick={create}>Create</button>
//
//         </div>
//     );
// };
//
// export default IndexPage;

import Login from "../components/Login";
import Register from "../components/Register";
import  socket  from "../socket";  // Ensure the correct path

const IndexPage = () => {
    return (
        <div className="d-flex p-5">
            <div className="grow1">
                <Login socket={socket} />
            </div>
            <div className="grow1">
                <Register />
            </div>
        </div>
    );
};

export default IndexPage;