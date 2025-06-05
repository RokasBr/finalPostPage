import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
// import mainStore from "./store/main";
import {useEffect, useState, useRef} from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import AllUsersPage from "./pages/AllUsersPage";
import socket from "./socket"
import Toolbar from "./components/Toolbar";
import ProfilePage from "./pages/ProfilePage";
import IndexPage from "./pages/IndexPage";
import HomePage from "./pages/HomePage";
import CreatePostPage from "./pages/CreatePostPage";
import useStore from "./store/main";
import FavoritesPage from "./pages/FavoritesPage";
import SinglePostPage from "./pages/SinglePostPage";
import SingleUserPage from "./pages/SingleUserPage";
import MessagesPage from "./pages/MessagesPage";

function App() {
    const fetchUser = useStore(state => state.fetchUser);
    useEffect(() => {
        fetchUser();
    }, []);
    // const {user} = mainStore(state => state)

    return (
        <div className="p-5">

            <BrowserRouter>
                {/*<Toolbar/>*/}
                <Routes>
                    <Route path="/" element={<IndexPage socket={socket}/>}></Route>
                    {/*<Route path="/register" element={<Register/>}></Route>*/}
                    {/*<Route path="/app" element={<AllUsersPage socket={socket}/>}></Route>*/}
                    {/*<Route path="/posts" element={<AllPostsPage/>}></Route>*/}
                    <Route path="/profile/:username" element={<ProfilePage/>}></Route>
                    <Route path="/home" element={<HomePage/>}></Route>
                    <Route path="/create" element={<CreatePostPage />}/>
                    <Route path="/favorites" element={<FavoritesPage/>}></Route>
                    <Route path="/post/:post_id" element={<SinglePostPage />} />
                    <Route path="/user/:username" element={<SingleUserPage />} />
                    <Route path="/messages" element={<MessagesPage />} />
                </Routes>
            </BrowserRouter>

        </div>

    );
}

export default App;
