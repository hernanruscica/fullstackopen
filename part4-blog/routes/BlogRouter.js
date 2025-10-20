const BlogRouter = require('express').Router()
const { request } = require('../app');
const BlogModel = require('../models/BlogModel')

/*
 title: String,
  author: String,
  url: String,
  likes: Number,
*/
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

BlogRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
  //console.log('blogrouter id', id);
  
  
    try{      
      await BlogModel.findByIdAndDelete(id);      
      response.status(204).end();
    }catch (error) {      
      next(error);
    }
  
});

BlogRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { likes } = request.body;
  const blogToUpdate = await BlogModel.findById(id);
  if (!blogToUpdate){
    return response.status(404).end()
  }  
  blogToUpdate.likes = likes;
  try{
    const saveBlogResponse = await blogToUpdate.save()
    response.status(200).json(saveBlogResponse).end();
  }catch(error) {
    next(error);
  }

})

module.exports = BlogRouter;