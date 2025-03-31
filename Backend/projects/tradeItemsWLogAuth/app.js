const {faker} = require('@faker-js/faker');
const express = require('express');
const cors = require('cors');
const mainRouter = require('./router/routes');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express()

mongoose.connect(process.env.MONGO_KEY)
    .then(res => {
        console.log('connected to DB')
    })
    .catch(err => console.log(err));


app.use(cors())
app.use(express.json());
app.use("/", mainRouter);




app.listen(2002)
console.log('listening on port 2002')