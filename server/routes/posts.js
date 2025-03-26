const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const mongoose = require('mongoose'); //added in debugging process

// Fetch posts by type
router.get('/:type', async (req, res) => {
    const { type } = req.params;
    console.log('Fetching posts of type:', type);
    
    try {
        const filter = { type };
        console.log('Using filter:', filter);
        const posts = await Post.find(filter).sort({ createdAt: -1 });
        console.log('Database being used:', mongoose.connection.db.databaseName);
        console.log('Number of posts found:', posts.length);
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ message: err.message });
    }
});

// fetch single post by ID
router.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const isDeployed = process.env.DEPLOYED === 'true';

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        
        if (isDeployed && post.dev) {
            return res.status(403).json({ message: 'This post is not accessible in deployed mode.' });
        }

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching post', error: err.message });
    }
});

//TESTING

// router.get('/test-deployed', (req, res) => {
//    const isDeployed = process.env.DEPLOYED === 'true';  // Check if DEPLOYED variable is true
//    console.log('DEPLOYED status:', isDeployed);  // Log the status to console for verification
//    res.json({ deployedStatus: isDeployed });  // Return the value as JSON
// });

// Add this temporary route to check all posts
router.get('/debug/all', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Debug route to see all posts regardless of type
router.get('/debug/all-posts', async (req, res) => {
    try {
        const posts = await Post.find({});
        console.log('All posts (ignoring type):', posts);
        res.json({
            count: posts.length,
            posts: posts
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;




