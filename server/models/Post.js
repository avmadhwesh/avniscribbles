const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['blog', 'essay', 'creative'], required: true }
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);
