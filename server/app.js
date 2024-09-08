const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
console.log('Is the app deployed?', process.env.DEPLOYED);  // NEW! Log to check the deployed status


// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('avniscribbles api');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB!'))
.catch((err) => console.error('MongoDB connection error:', err));

// Load and use post routes
const postRoutes = require('./routes/posts');  // Import your routes
app.use('/api/posts', postRoutes);  // Use the routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
