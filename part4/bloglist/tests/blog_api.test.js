const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const Fixtures = require('./fixtures')

const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI1ZjAxY2JjOTVkNmQ2OTc3ODQ2OTVmMDMiLCJpYXQiOjE1OTUwMDg4NTl9.Z2IDV8WPVpkX2Foeg0Ll40Mch7Cx_Yhv4XMsPt7qqao"

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = Fixtures.biggerBlogList
    .map(blog => new Blog(blog))
  const saveBlogs = blogObjects.map(blog => blog.save())
  const saveUser = new User(Fixtures.testUser).save()
  await Promise.all(saveBlogs, saveUser)
})

test('should return blog list successfully as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(Fixtures.biggerBlogList.length)
})

test('should return blogs with id property instead of _id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  });
})

test('should create a new blog post successfully', async () => {
  const newBlog = {
    title: "New test blog",
    author: "New blog authoer",
    url: "test.com/newBlog",
    likes: 12
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${userToken}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(Fixtures.biggerBlogList.length + 1)
})

test('should create a new blog post successfully with likes=0 if missing from request', async () => {
  const newBlog = {
    title: "New test blog",
    author: "New blog author",
    url: "test.com/newBlog"
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${userToken}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(Fixtures.biggerBlogList.length + 1)

  const savedBlog = response.body.find(blog => blog.title === newBlog.title)
  expect(savedBlog.likes).toEqual(0)
})

test('should return HTTP 400 Bad Request if trying to create a new blog post with no title or URL', async () => {
  const newBlog = {
    author: "New blog author"
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${userToken}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(Fixtures.biggerBlogList.length)
})

test('should return HTTP 401 Unauthorized if trying to create a new blog post without an auth token provided', async () => {
  const newBlog = {
    title: "New test blog",
    author: "New blog authoer",
    url: "test.com/newBlog",
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})

test('should delete a blog post successfully', async () => {
  const blogToDeleteId = Fixtures.biggerBlogList[0]._id

  await api
    .delete(`/api/blogs/${blogToDeleteId}`)
    .set('Authorization', `Bearer ${userToken}`)
    .expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(Fixtures.biggerBlogList.length - 1)
})

test('should update a blog post successfully', async () => {
  const blogToUpdateId = Fixtures.biggerBlogList[0]._id
  const updatedBlog = {
    likes: 15
  }

  await api
    .put(`/api/blogs/${blogToUpdateId}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(Fixtures.biggerBlogList.length)

  const blog = response.body.find(blog => blog.id === blogToUpdateId)
  expect(blog.likes).toEqual(updatedBlog.likes) 
})

afterAll(() => {
  mongoose.connection.close()
})