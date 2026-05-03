// const express = require("express");
// const app = express();

// app.get("/api/hello", (req, res) => {
//   res.json({
//     message: "Hello from Vercel!",
//     time: new Date().toISOString(),
//   });
// });

// // Export untuk Vercel
// module.exports = app;

const app = require("../app");

// Vercel handler
module.exports = app;
