const BlogRouter = require('express').Router()
const BlogModel = require('../models/BlogModel')


BlogRouter.get('/', async (request, response, next) => {  
  try {
    const results = await BlogModel.find();
    return response.status(200).json(results);
  } catch (error) {
    next(error);
  }
});

BlogRouter.post('/', async (request, response, next) => {
  const { body } = request;
  if (!body.title || !body.url) {
    return response.status(400).json({ 
      error: 'Title or URL missing' 
    });
  }
  const blog = new BlogModel({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }  
});

module.exports = BlogRouter;