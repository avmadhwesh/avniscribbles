const express = require('express');
const multer = require('multer');
const mammoth = require('mammoth');
const fs = require('fs');
const { JSDOM } = require('jsdom');
const Post = require('../models/Post');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

function parseDocumentContent(htmlContent) {
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    const elements = document.body.children;
    
    const fcontent = [];
    
    for (let element of elements) {
        if (element.tagName === 'P') {
            const paragraph = {
                type: 'paragraph',
                text: element.textContent.trim()
            };
            if (paragraph.text) fcontent.push(paragraph);
        }
        else if (element.querySelector('i, em')) {
            const italicElements = element.querySelectorAll('i, em');
            italicElements.forEach(italic => {
                fcontent.push({
                    type: 'ftext',
                    text: italic.textContent.trim(),
                    style: 'italic'
                });

                const surroundingText = element.textContent.replace(italic.textContent, '').trim();
                if (surroundingText) {
                    fcontent.push({ type: 'raw-text', text: surroundingText });
                }
            });
        }
        else if (element.textContent.trim()) {
            fcontent.push({ type: 'raw-text', text: element.textContent.trim() });
        }
    }
    
    return fcontent;
}

// File upload route
router.post('/upload', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const title = req.file.originalname.replace(/\.[^/.]+$/, "");
        const result = await mammoth.convertToHtml({ path: req.file.path });

        const fcontent = parseDocumentContent(result.value);

        const postData = {
            title,
            content: fcontent,
            type: req.body.type || 'creative',
            dev: true, //hardcoded for now
            tags: req.body.tags || [req.body.type || 'creative'],
            notes: req.body.notes || '',
            createdAt: new Date()
        };

        const newPost = new Post(postData);
        await newPost.save();

        fs.unlinkSync(req.file.path); // Clean up uploaded file

        res.json({ message: 'File processed successfully', post: newPost });

    } catch (error) {
        console.error('Upload processing error:', error);
        res.status(500).json({ error: error.message });
    }
});

// File preview route
router.post('/preview', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const title = req.file.originalname.replace(/\.[^/.]+$/, "");
        const result = await mammoth.convertToHtml({ path: req.file.path });

        const fcontent = parseDocumentContent(result.value);

        fs.unlinkSync(req.file.path); // Clean up the preview file

        res.json({ title, fcontent });

    } catch (error) {
        console.error('Preview processing error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Debugging route
router.post('/upload-test', (req, res) => {
    console.log("Received upload request!");
    res.json({ message: "Upload route is working!" });
});

module.exports = router;
