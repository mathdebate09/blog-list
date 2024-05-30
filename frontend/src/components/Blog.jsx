import { useState } from 'react'

const Blog = ({ blog, handleLikes }) => {
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

  return (
    <div style={blogStyle}>
      <div className="">
        {blog.title} {blog.author} <button onClick={toggleFullVisibility}>view</button>
      </div>
      {fullVisibility && (
        <>
          <a>{blog.url}</a>
          <div>likes {blog.likes} <button onClick={() => handleLikes(blog.id)}>likes</button></div>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  )
}

export default Blog