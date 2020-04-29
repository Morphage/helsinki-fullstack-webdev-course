const listHelper = require('../utils/list_helper')
const Fixtures = require('./fixtures')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(Fixtures.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(Fixtures.biggerBlogList)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toStrictEqual({})
  })

  test('when list has only one blog equals the blog', () => {
    const result = listHelper.favoriteBlog(Fixtures.listWithOneBlog)
    expect(result).toStrictEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(Fixtures.biggerBlogList)
    expect(result).toStrictEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })
})

describe('most blogs', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toStrictEqual({})
  })

  test('when list has only one blog equals the blog', () => {
    const result = listHelper.mostBlogs(Fixtures.listWithOneBlog)
    expect(result).toStrictEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(Fixtures.biggerBlogList)
    expect(result).toStrictEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toStrictEqual({})
  })

  test('when list has only one blog equals the blog', () => {
    const result = listHelper.mostLikes(Fixtures.listWithOneBlog)
    expect(result).toStrictEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(Fixtures.biggerBlogList)
    expect(result).toStrictEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})