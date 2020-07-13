const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/users', async (request, response) => {
  const body = request.body
  const username = body.username
  const password = body.password

  if (!username || !password) {
    return response.status(400).json(
      { error: 'username or password is missing' }
    )
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json(
      { error: 'username or password must be at least 3 characters long' }
    )
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/users', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url : 1, title: 1, author: 1 })
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter