import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

    const handleAdd = (e) => {
        e.preventDefault()

        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url
        })

        setNewBlog({ title: '', author: '', url: '' })
    }

    const handleBlogTitleChange = (event) => {
        setNewBlog({ ...newBlog, title: event.target.value })
    }

    const handleBlogAuthorChange = (event) => {
        setNewBlog({ ...newBlog, author: event.target.value })
    }

    const handleBlogUrlChange = (event) => {
        setNewBlog({ ...newBlog, url: event.target.value })
    }

    return (
        <form onSubmit={handleAdd}>
            <div>
                title: <input id="title" value={newBlog.title} onChange={handleBlogTitleChange} />
                <br />
                author: <input id="author" value={newBlog.author} onChange={handleBlogAuthorChange} />
                <br />
                url: <input id="url" value={newBlog.url} onChange={handleBlogUrlChange} />
            </div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>
    )
}

export default BlogForm;