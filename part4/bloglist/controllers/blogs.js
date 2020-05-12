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

blogsRouter.put('/blogs/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter