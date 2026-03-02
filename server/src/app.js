// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const path = require("path");

// const authRoutes = require("./routes/authRoutes");
// const errorHandler = require("./middlewares/errorHandler");

// const app = express();

// // CORS config (your code unchanged)
// const defaultOrigin = "http://localhost:5173";
// const configuredOrigin = (process.env.FRONTEND_URL || defaultOrigin)
//   .trim()
//   .replace(/^['"]|['"]$/g, "")
//   .replace(/\/$/, "");

// const allowedOrigins = new Set([defaultOrigin, configuredOrigin]);

// const isLocalDevOrigin = (origin) =>
//   /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin) return callback(null, true);

//       const normalizedOrigin = origin.replace(/\/$/, "");
//       if (
//         allowedOrigins.has(normalizedOrigin) ||
//         (process.env.NODE_ENV !== "production" &&
//           isLocalDevOrigin(normalizedOrigin))
//       ) {
//         return callback(null, true);
//       }

//       return callback(new Error("CORS: Origin not allowed"));
//     },
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());



// app.use(express.static(path.join(__dirname, "../public")));

// // API routes
// app.get("/api/health", (req, res) => {
//   res.json({ status: "ok" });
// });

// app.use("/api/auth", authRoutes);

// app.use(errorHandler);

// module.exports = app;


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// CORS
const defaultOrigin = "http://localhost:5173";
const configuredOrigin = (process.env.FRONTEND_URL || defaultOrigin)
  .trim()
  .replace(/^['"]|['"]$/g, "")
  .replace(/\/$/, "");

const allowedOrigins = new Set([defaultOrigin, configuredOrigin]);

const isLocalDevOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");
      if (
        allowedOrigins.has(normalizedOrigin) ||
        (process.env.NODE_ENV !== "production" &&
          isLocalDevOrigin(normalizedOrigin))
      ) {
        return callback(null, true);
      }

      return callback(new Error("CORS: Origin not allowed"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// 🔥 Serve React build
app.use(express.static(path.join(__dirname, "../public")));

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

// 🔥 SPA fallback (React)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// 🔥 Error handler MUST BE LAST
app.use(errorHandler);

module.exports = app;