import React from 'react';
import mainStore from "../store/main";
import {Link} from "react-router-dom";

const SingleUser = ({user, socket}) => {
    const {user:myUser} = mainStore(state => state)

    function pokeUser() {

        if (!myUser) {
            console.error("User is not logged in, cannot poke.");
            return;
        }

        const item = {
            username: user.username,
            whoPoked: myUser.username
        }
        socket.emit("poke", item)
    }


    return (
        <div className="p-3 border mb-2">
            <Link to={`/user/${user.username}`}>
                <h3>{user.username}</h3>
            </Link>
        </div>
    );

    // return (
    //     <div className="p-3 border d-flex justify-content-between">
    //         <h1>{user.username}</h1>
    //
    //         {user.online &&  <button onClick={pokeUser}>Poke</button>}
    //     </div>
    // );
};

export default SingleUser;