const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Save a new post
router.post('/', async (req, res) => {
   const newPost = new Post(req.body);
   try {
       const savedPost = await newPost.save();
       res.status(201).json(savedPost);
   } catch (err) {
       res.status(500).json({ message: err.message });
   }
});

// Fetch posts by type
router.get('/:type', async (req, res) => {
    const { type } = req.params;
    try {
        const posts = await Post.find({ type });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch post by ID
router.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
