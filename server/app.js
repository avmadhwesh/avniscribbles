// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();  // Load environment variables

// const app = express();
// const PORT = process.env.PORT || 5000;
// console.log('Is the app deployed?', process.env.DEPLOYED);  // NEW! Log to check the deployed status


// // Middleware
// app.use(cors());
// app.use(express.json());

// // Basic route
// app.get('/', (req, res) => {
//     res.send('avniscribbles api');
// });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log('Connected to MongoDB!');
//     console.log('Database name:', mongoose.connection.db.databaseName);
//     console.log('Collections:', mongoose.connection.collections);
// })
// .catch((err) => console.error('MongoDB connection error:', err));

// // Load and use post routes
// const postRoutes = require('./routes/posts');  // Import your routes
// app.use('/api/posts', postRoutes);  // Use the routes

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
console.log('Is the app deployed?', process.env.DEPLOYED);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Support form data

// Basic route
app.get('/', (req, res) => {
    res.send('avniscribbles api');
});

// Update the CORS configuration here
app.use(cors({
    origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'],
    credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB!');
})
.catch((err) => console.error('MongoDB connection error:', err));

// Load and use routes
const postRoutes = require('./routes/posts');  
const uploadRoutes = require('./routes/upload');  // Import upload routes

app.use('/api/posts', postRoutes);  
app.use('/api', uploadRoutes);  // Register upload routes

// List all registered routes (debugging)
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
      console.log(`Registered route: ${r.route.path}`);
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
