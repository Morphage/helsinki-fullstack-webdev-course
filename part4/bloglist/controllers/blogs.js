const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/blogs', async (request, response) => {
  const savedBlog = await new Blog(request.body).save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter