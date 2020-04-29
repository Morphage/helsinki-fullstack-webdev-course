const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length > 0
        ? blogs.sort((a, b) => b.likes - a.likes)[0]
        : {}
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {}

    const blogPostsPerAuthor = _.groupBy(blogs, (blog) => blog.author)
    return Object.keys(blogPostsPerAuthor)
        .map((author) => blogPostsPerAuthor[author])
        .reduce((mostBlogs, blogs) => {
            return blogs.length > mostBlogs.blogs
                ? { author: blogs[0].author, blogs: blogs.length }
                : mostBlogs
        }, { blogs: 0 })
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {}

    const blogPostsPerAuthor = _.groupBy(blogs, (blog) => blog.author)
    return Object.keys(blogPostsPerAuthor)
        .map((author) => blogPostsPerAuthor[author])
        .map((blogPostsPerAuthor) => {
            return { author: blogPostsPerAuthor[0].author, likes: totalLikes(blogPostsPerAuthor) }
        })
        .reduce((mostLikes, authorWithLikes) => {
            return authorWithLikes.likes > mostLikes.likes
                ? { author: authorWithLikes.author, likes: authorWithLikes.likes }
                : mostLikes
        }, { likes: 0 })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}