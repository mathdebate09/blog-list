import { useState } from 'react'

const Blog = ({ blog, handleLikes, deleteBlog }) => {
  const [fullVisibility, setFullVisibility] = useState(false)

  const toggleFullVisibility = () => {
    setFullVisibility(!fullVisibility)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = (id) => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    deleteBlog(id)
  }
}

  return (
    <div style={blogStyle}>
      <div className="blog" data-testid="blog">
        {blog.title} {blog.author} <button onClick={toggleFullVisibility}>view</button>
      </div>
      {fullVisibility && (
        <>
          <a href={`https://${blog.url}`} target="_blank" rel="noopener noreferrer" >{blog.url}</a>
          <div>likes {blog.likes} <button onClick={() => handleLikes(blog.id)}>like</button></div>
          <div>{blog.user.name}</div>
          <button onClick={() => handleDelete(blog.id)}>remove</button>
        </>
      )}
    </div>
  )
}

export default Blog