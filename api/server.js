// implement your server here
// require your posts router and connect it here
const express = require('express');

const server = express();

server.use(express.json());

const postsRoutes = require('./posts/posts-router');


server.use('/posts', postsRoutes)
module.exports = server