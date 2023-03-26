const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    return response.json(blogs);
  } catch (error) {
    next(error);
  }

  // Blog.find({})
  //   .then((blogs) => {
  //     response.json(blogs);
  //   })
  //   .catch((error) => next(error));
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }

  // blog
  //   .save()
  //   .then((result) => {
  //     response.status(201).json(result);
  //   })
  //   .catch((error) => next(error));
});

module.exports = blogsRouter;
