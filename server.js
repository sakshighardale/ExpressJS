// const express = require("express");
// const path = require("path");

import express from "express";
import path from "path";
// const posts = require("./routes/posts.js");
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
const PORT = process.env.PORT || 5000;

//Get directory name // __dirname is not directly available as we are using ES module

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logger middleware
app.use(logger);

//setup static folder (middlware function)
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/posts", posts);

app.use(notFound);

//Error handler
app.use(errorHandler);

// let posts = [
//   { id: 1, title: "Post 1" },
//   { id: 2, title: "Post 2" },
//   { id: 3, title: "Post 3" },
// ];
// //Get all posts
// app.get("/api/posts", (req, res) => {
//   console.log(req.query);
//   const limit = parseInt(req.query.limit);
//   if (!isNaN(limit) && limit > 0) {
//     res.status(200).json(posts.slice(0, limit));
//   } else {
//     res.status(200).json(posts);
//   }
//   //   res.send(posts);
//   res.json(posts);
// });

// //Get single post
// app.get("/api/posts/:id", (req, res) => {
//   //   res.send(posts);
//   console.log(req.params.id);
//   const id = parseInt(req.params.id);
//   const post = posts.find((post) => post.id === id);
//   if (!post) {
//     return res.status(404).json({ msg: `Post with id: ${id} not found!` });
//   }
//   res.status(200).json(post);
//   //   res.status(200).json(posts.filter((post) => post.id === id));
//   //   res.json(posts);
// });

// // app.get("/", (req, res) => {
// //   //   res.send("<h1>Hello Sakshi here</h1>");
// //   //   res.send({ message: "SAksi here" });
// //   res.sendFile(path.join(__dirname, "public", "index.html"));
// // });

// // app.get("/about", (req, res) => {
// //   //   res.send("About");
// //   res.sendFile(path.join(__dirname, "public", "about.html"));
// // });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
