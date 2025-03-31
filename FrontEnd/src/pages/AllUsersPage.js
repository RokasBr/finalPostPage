import React, {useEffect, useState} from 'react';
import http from "../plugins/https"
import SingleUser from "../components/SingleUser";
import {socket} from "../socket";

const AllUsersPage = ({socket}) => {

    const [users, setUsers] = useState([])

    useEffect(() => {

        http.get("http://localhost:2002/users")
            .then(res => {
                console.log(res)
                setUsers(res.users)
            })

    }, [])

    return (
        <div>
            {users.map(x => <SingleUser socket={socket} user={x} key={x._id}/>)}
        </div>
    );
};

export default AllUsersPage;