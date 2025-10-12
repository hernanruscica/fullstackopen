const BlogRouter = require('express').Router()
const BlogModel = require('../models/BlogModel')


BlogRouter.get('/', (request, response, next) => {
  BlogModel.find().then(results => {
    response.json(results);
  }).catch(error => next(error))
});

BlogRouter.post('/', (request, response, next) => {
  const { body } = request;
  const blog = new BlogModel({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  blog.save().then(savedBlog => {
    response.status(201).json(savedBlog);
  }).catch(error => next(error))
});

module.exports = BlogRouter;