const blogsRouters = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouters.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouters.post('/', async (request, response, next) => {
    const body = request.body
    if (!body.title || !body.url) {
        return response.status(400).send({ error: 'title or url missing' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})
 
blogsRouters.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const userid = decodedToken.id
    
    if ( blog.user.toString() === userid.toString() ) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }

    return response.status(401).json({ error: 'token invalid' })
})

blogsRouters.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0
    }

    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    return response.json(savedBlog)
})

module.exports = blogsRouters