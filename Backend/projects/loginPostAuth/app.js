const {faker} = require('@faker-js/faker');
const express = require('express');
const cors = require('cors');
const mainRouter = require('./router/routes');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express()


app.use(cors())
app.use(express.json());
app.use("/", mainRouter);

console.log(process.env.SECRET_KEY);


function login()
{
    const loggedInUser = {
        username: 'Rokas',
        age: 24,
        city: "kretinga",
        hasCat: false,
    }
    const token = jwt.sign(loggedInUser, process.env.SECRET_KEY, )
    console.log(token)

}
// login()

function updateStuff(){
    const userToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJva2FzIiwiYWdlIjoyNCwiY2l0eSI6ImtyZXRpbmdhIiwiaGFzQ2F0IjpmYWxzZSwiaWF0IjoxNzM4NzU2OTUyfQ.c3f9S6LZUjWzhBO25ReoHldWhjtwWZJUC-zpXIG0Qug'
    jwt.verify(userToken, process.env.SECRET_KEY, async (err, item) => {
        console.log(item)
    })

}
// updateStuff()

function register() {
    const userPassword = "slaptas123"

    bcrypt.genSalt(5, (err, salt) => {

        bcrypt.hash(userPassword, salt, (err, hash) => {

            console.log(hash)
        });
    });
}

// function login() {
//     const userPassword = "slaptas123"
//     const userPasswordHash = "$2b$05$QNIjVHes4iff8anB39VJg.bBfrRU0rcuInY5FojbNczBr95j/o79G"
//
//     bcrypt.compare(userPassword, userPasswordHash, (err, result) => {
//         console.log(result)
//     })
// }

app.listen(2002)
console.log('listening on port 2002')