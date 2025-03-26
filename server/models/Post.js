const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fcontent: [{
        type: { type: String },
        text: String,
        style: String
    }],
    content: {
        type: mongoose.Schema.Types.Mixed, // ✅ Can be either a string or an array of objects
        required: true
    },
    type: { type: String, enum: ['blog', 'essay', 'creative', 'scribbles'], required: true },
    dev: { type: Boolean, default: true },
    tags: [{ type: String }],
    notes: String,
    createdAt: { type: Date, default: Date.now }
});


// const postSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     fcontent: [{
//         type: { type: String },
//         text: String,
//         style: String
//     }],
//     content: String,
//     type: { type: String, enum: ['blog', 'essay', 'creative'], required: true },
//     dev: { type: Boolean, default: false },
//     tags: [{ type: String }],
//     notes: String,
//     createdAt: { type: Date, default: Date.now }
// });

module.exports = mongoose.model('Post', postSchema);
