const blogsRouters = require('express').Router()
const Blog = require('../models/blog')

blogsRouters.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogsRouters.post('/api/blogs', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
        .then(savedBlogs => {
            response.status(201).json(savedBlogs)
        })
        .catch(error => next(error))
})

module.exports = blogsRouters