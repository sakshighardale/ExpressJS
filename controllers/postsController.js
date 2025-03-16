let posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

//@desc Get all posts
//@route GET /api/posts
export const getPosts = (req, res) => {
  console.log(req.query);
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.status(200).json(posts.slice(0, limit));
  } else {
    res.status(200).json(posts);
  }
  //   res.send(posts);
  res.json(posts);
};

//@desc GET single post
//@route GET /api/posts/:id
export const getPost = (req, res, next) => {
  //   res.send(posts);
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    // return res.status(404).json({ msg: `Post with id: ${id} not found!` });
    const error = new Error(`Post with id: ${id} not found!`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
  //   res.status(200).json(posts.filter((post) => post.id === id));
  //   res.json(posts);
};

//@desc create a post
//@route POST /api/posts/body
export const createPost = (req, res, next) => {
  console.log(req.body);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) {
    // return res
    //   .status(404)
    //   .json({ msg: "Missing title, Please include title!" });
    const error = new Error(`Please include the title`);
    error.status;
    return next(error);
  }
  posts.push(newPost);
  res.status(201).json(posts);
};

//@desc update post
//@route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    // return res.status(404).json({ msg: `Post with id : ${id} is not found` });
    const error = new Error(`Post with id: ${id} not found!`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title;
  res.status(200).json(posts);
};

//@desc delete post
//@route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    // return res.status(404).json({ msg: `Post with id : ${id} is not found` });
    const error = new Error(`Post with id: ${id} not found!`);
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};
