const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Fetch posts by type
router.get('/:type', async (req, res) => {
    const { type } = req.params;
    const isDeployed = process.env.DEPLOYED === 'true';  //deployment check

    try {
        // filter out dev posts
        const filter = isDeployed ? { type, dev: false } : { type };


        const posts = await Post.find(filter).sort({ createdAt: -1 });  // newest first sort



      //   const posts = await Post.find(filter);
        res.status(200).json(posts);
    } catch (err) {
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

module.exports = router;




