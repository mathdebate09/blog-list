const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('uuid property is id and not _id(default)', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToCheck = blogsAtStart[0]

    assert('id' in blogToCheck)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'You dont know Js',
        author: 'Kyle Simpson',
        url: 'https://github.com/getify/You-Dont-Know-JS',
        likes: 484946
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterAdd = await helper.blogsInDb()
    assert.strictEqual(blogsAfterAdd.length, helper.initialBlogs.length + 1)

    const newBlogFromDb = blogsAfterAdd[helper.initialBlogs.length]
    assert.strictEqual(newBlogFromDb.title, 'You dont know Js')
})

test('missing like property in post defaults it to zero in db', async () => {
    const newBlog = {
        title: 'You dont know Js',
        author: 'Kyle Simpson',
        url: 'https://github.com/getify/You-Dont-Know-JS'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterAdd = await helper.blogsInDb()
    const newBlogFromDb = blogsAfterAdd[helper.initialBlogs.length]

    // test that the property exists
    assert('likes' in newBlogFromDb)
    // test that it defaults to zero
    assert.strictEqual(newBlogFromDb.likes, 0)
})

test.only('missing title/url in post responds with 400 Bad Request', async () => {
    const newMissingTitle = {
        author: 'Kyle Simpson',
        url: 'https://github.com/getify/You-Dont-Know-JS',
        likes: 99289
    }

    const newMissingUrl = {
        title: 'You dont know Js',
        author: 'Kyle Simpson',
        likes: 99289
    }

    await api
        .post('/api/blogs')
        .send(newMissingTitle)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(newMissingUrl)
        .expect(400)

    const blogsAtStart = await helper.blogsInDb()

    assert.deepStrictEqual(blogsAtStart.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})