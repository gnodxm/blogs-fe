import { useState } from "react"

const Blog = ({blog, updateBlog, username, removeBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] = useState(false)

  const toggleView =  () => {
    setView(!view)
  }

  const handleLike = async () => {
    // const updatedBlog = await blogService.update(blog.id, {...blog, likes: blog.like + 1})
    // setCurrentBlog(updatedBlog)
    updateBlog(blog.id,  {...blog, likes: blog.likes + 1})
    
  }

  const handleRemove = async () => {
    removeBlog(blog.id)
  }

  
  const viewDetail = () => (
    <div>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
      <p>{blog.user.username}</p>
      {blog.user.username  === username
        ? <button onClick={handleRemove}>remove</button>
        : null
      }
    </div>
  )
  return  (
  <div style={blogStyle}>
    <p>{blog.title} {blog.author} 
      <button onClick={toggleView}>{view? 'hide': 'view'}</button>
    </p> 
    {view && viewDetail()}
  </div>  
)}

export default Blog