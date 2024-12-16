require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const listRoutes = require("./routes/listRoutes");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/lists", listRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
