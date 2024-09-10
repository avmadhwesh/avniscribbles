const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     type: { type: String, enum: ['blog', 'essay', 'creative'], required: true }
// }, 
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    type: String,
    createdAt: { type: Date, default: Date.now },
    dev: Boolean,
    tags: [String],
    notes: String,
  
    // New fields for pinning
    pinned: { type: Boolean, default: false },   // Whether the post is pinned or not
    pinnedOrder: { type: Number, default: null },  // Order in which the post should appear if pinned
  },
{ 
    timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);
