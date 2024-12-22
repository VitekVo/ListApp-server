require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const listRoutes = require("./routes/listRoutes");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const port = process.env.PORT || 5001;

const allowedOrigins = ["https://listapp-nvc3.onrender.com"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // If using cookies or authorization headers
  })
);

app.use(express.json());

// Connect to MongoDB
connectDB();

// Error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

// Routes
app.use("/api/lists", listRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
