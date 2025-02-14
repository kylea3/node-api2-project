// implement your posts router here
const express = require('express');
const Post = require('./posts-model')

const router = express.Router();

router.get('/', (req, res) => {
    Post.find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: "The posts information could not be retrieved" })
        }) 
})

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id); 
    if(!post) {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else {
        Post.findById(req.params.id)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err => {
                res.status(500).json({ message: "The post information could not be retrieved" })
            })
    }
})

router.post('/', async (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents) {
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Post.insert({ title, contents })
            .then(post => {
                return Post.findById(post.id)
            })
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error while saving the post to the database" })
            })
    }
})

router.put('/:id', async (req, res) => {
    updatedPost = await Post.findById(req.params.id);
    const { title, contents } = req.body;
    if (!updatedPost) {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else if(!title || !contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    } else {
        Post.update(req.params.id, req.body)
        .then(post => {
            if(post) {
                return Post.findById(req.params.id)
            }
        })
        .then(post => {
            res.status(200).json(post)
        })            
        .catch(err => {
            res.status(500).json({ message: "The post information could not be modified" })
        })
    }
})

router.delete('/:id', async (req, res) => {
    const postData = await Post.findById(req.params.id);
    const deletedPost = await Post.remove(req.params.id);
    console.log(postData)
    if(!deletedPost) {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else {
        Post.remove(req.params.id)
            .then(post => {
               res.status(200).json(postData)
            })
            .catch(err => {
                res.status(500).json({ message: "The post could not be removed" })
            })
    }
})

router.get('/:id/comments', async (req, res) => {
    const comments = await Post.findById(req.params.id);
    if(!comments) {
        res.status(404).json({ message: "The post with the specified ID does not exist" })
    } else {
        Post.findPostComments(req.params.id)
            .then(comment => {
                res.status(200).json(comment)
            })
            .catch(err => {
                res.status(500).json({ message: "The comments information could not be retrieved" })
            })
    }
})

module.exports = router;

