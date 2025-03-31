const {faker} = require('@faker-js/faker');
const express = require('express');
const cors = require('cors');

const app = express()

app.use(express.json());
app.use(cors())


const {uid} = require('uid')

let posts = [];

app.post('/create', (req, res) =>
{
    if(!("image" in req.body)) return res.send({error: true, message: "No image in body"})
    if(!("title" in req.body)) return res.send({error: true, message: "No title in body"})
    if(!(req.body.image.includes("http"))) return res.send({error: true, message: "Image is not a link"})
    if(req.body.title.length > 100 || req.body.title.length < 3) return res.send({error: true, message: "Title too short"})

    console.log('len: ' + req.body.title.length)

    const item = {
        ...req.body,
        id: uid()

    }
    console.log("body " + req.body)

    console.log(item)
    posts.push(item)
    res.send({ok: 'ok'})
})

app.get('/posts', (req, res) => {
    res.send({posts})
})

app.get('/remove/:id', (req, res) => {
    const id = req.params.id;
    posts = posts.filter(x => x.id !== id);
    res.send({posts})
})

app.listen(2001)
console.log('listening on port 2001')