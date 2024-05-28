const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How to add metaData in Nextjs',
    author: 'Hugh Charles',
    url: 'www.example.com',
    likes: 4
  },
  {
    title: 'How to stay focused',
    author: 'Minaka Kashimoto',
    url: 'www.mkmoto.com',
    likes: 78
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}