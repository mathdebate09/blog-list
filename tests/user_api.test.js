const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('formatting user inputs', () => {
    test('username and password must be given', async () => {
        const newUser = {
            name: 'Test User'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert.strictEqual(result.body.error, 'username and password must be given')
    })

    test('username and password must be at least 3 characters long', async () => {
        const newUser = {
            username: 'ab',
            password: '12',
            name: 'Test User'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert.strictEqual(result.body.error, 'username and password must be at least 3 characters long')
    })
})

after(async () => {
    await mongoose.connection.close()
})