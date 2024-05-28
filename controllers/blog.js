const blogsRouters = require('express').Router()
const Blog = require('../models/blog')

blogsRouters.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouters.post('/api/blogs', async (request, response, next) => {
    const body = request.body

    if (!body.title || !body.url) {
        return response.status(400).send({ error: 'title or url missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouters