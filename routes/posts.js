// const express = require("express");
import express from "express";
const router = express.Router();
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postsController.js";

// //middleware functions
// const logger = (req, res, next) => {
//   console.log(
//     `${req.method} ${req.protocol}://${req.get("host")}${req.originalURl}`
//   );
//   next();
// };

//Get all posts
router.get("/", getPosts);

//Get single post
router.get("/:id", getPost);

// Create new post
router.post("/", createPost);

// Update post
router.put("/:id", updatePost);

//delete post
router.delete("/:id", deletePost);

// app.get("/", (req, res) => {
//   //   res.send("<h1>Hello Sakshi here</h1>");
//   //   res.send({ message: "SAksi here" });
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   //   res.send("About");
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

// module.exports = router;

export default router;
