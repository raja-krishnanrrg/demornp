


// import dotenv from "dotenv";
// dotenv.config();

// import path from "path";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// import taskRoutes from "./routes/taskRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// const app = express();


// // ✅ CORS FIX (VERY IMPORTANT)
// app.use(cors({
//   origin: "https://demornp.onrender.com",
//   credentials: true
// }));

// app.use(express.json());


// // ✅ MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//   })
//   .catch((err) => {
//     console.log("❌ DB Error:", err.message);
//   });


// // ✅ Static frontend (production only)
// const __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   const frontendPath = path.join(__dirname, "..", "frontend", "dist");

//   app.use(express.static(frontendPath));

//   app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// }


// // ✅ API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/admin", adminRoutes);


// // ✅ Server start
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();


// ✅ CORS (FINAL FIX)
const allowedOrigin = "https://demornp.onrender.com";

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// ✅ Middleware
app.use(express.json());


// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });


// ✅ Static frontend (production only)
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");

  app.use(express.static(frontendPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}


// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);


// ✅ Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});