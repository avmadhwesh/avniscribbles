// import express from "express";

// const app = express();

// app.get("/", (req, res) => {
//   res.send("connected");
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log("Server listening the port http://localhost/" + port);
// });

import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.js"; // Import the upload route


const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Support form data

// Register routes
app.use("/api", uploadRoutes); // Now /api/upload and /api/preview are available

app.get("/", (req, res) => {
  res.send("connected");
});

const port = process.env.PORT || 5000;

app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
      console.log(`Registered route: ${r.route.path}`);
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
