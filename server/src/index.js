// const dotenv = require("dotenv");

// dotenv.config();

// const pool = require("./config/db");
// const app = require("./app");
// const userModel = require("./models/userModel");

// const PORT = process.env.PORT || 5001;

// async function startServer() {
//   try {
//     await pool.query("SELECT 1");
//     await userModel.initUserTable();
//     console.log("Database connected");

//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Startup failed:", error.message || error);
//     process.exit(1);
//   }
// }

// startServer();


const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");

const pool = require("./config/db");
const app = require("./app");
const userModel = require("./models/userModel");

const PORT = process.env.PORT || 5001;

// 🔥 IMPORTANT — serve frontend build
const publicPath = path.join(__dirname, "../public");

// Serve static files (React build)
app.use(express.static(publicPath));

// SPA routing (React Router support)
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

async function startServer() {
  try {
    await pool.query("SELECT 1");
    await userModel.initUserTable();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message || error);
    process.exit(1);
  }
}

startServer();
