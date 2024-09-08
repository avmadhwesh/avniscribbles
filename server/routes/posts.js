// const express = require('express');
// const router = express.Router();
// const Post = require('../models/Post');

// // Save a new post
// router.post('/', async (req, res) => {
//    const newPost = new Post(req.body);
//    try {
//        const savedPost = await newPost.save();
//        res.status(201).json(savedPost);
//    } catch (err) {
//        res.status(500).json({ message: err.message });
//    }
// });

// // Fetch posts by type
// router.get('/:type', async (req, res) => {
//     const { type } = req.params;
//     try {
//         const posts = await Post.find({ type });
//         res.status(200).json(posts);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Fetch post by ID with access restriction based on dev flag
// router.get('/post/:id', async (req, res) => {  // Changed to /post/:id to avoid conflict
//     const { id } = req.params;

//     try {
//         // Check if app is deployed
//       //   const isDeployed = process.env.REACT_APP_DEPLOYED === 'true';  // Check environment variable
//       const isDeployed = process.env.DEPLOYED === 'true';  // ******* Use DEPLOYED env variable from backend .env

//         // Fetch the post by ID
//         const post = await Post.findById(id);

//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         // If the post is marked as dev and the app is deployed, restrict access
//         if (isDeployed && post.dev) {
//             return res.status(403).json({ message: 'This post is not accessible in deployed mode.' });
//         }

//         // Otherwise, return the post
//         res.status(200).json(post);

//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching post', error: error.message });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Fetch all posts by type (block dev posts if deployed)
router.get('/:type', async (req, res) => {
    const { type } = req.params;
    const isDeployed = process.env.DEPLOYED === 'true';  // Check if app is deployed

    try {
        // Filter out dev posts if the app is deployed
        const filter = isDeployed ? { type, dev: false } : { type };
        const posts = await Post.find(filter);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch single post by ID (block dev posts if deployed)
router.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const isDeployed = process.env.DEPLOYED === 'true';  // Check if app is deployed

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Block dev posts if the app is deployed
        if (isDeployed && post.dev) {
            return res.status(403).json({ message: 'This post is not accessible in deployed mode.' });
        }

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching post', error: err.message });
    }
});

//TESTING
// Test route to check if DEPLOYED variable is working
router.get('/test-deployed', (req, res) => {
   const isDeployed = process.env.DEPLOYED === 'true';  // Check if DEPLOYED variable is true
   console.log('DEPLOYED status:', isDeployed);  // Log the status to console for verification
   res.json({ deployedStatus: isDeployed });  // Return the value as JSON
});

module.exports = router;




