import { useState } from "react"

const BlogForm = ({createBlog,setMessage}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObj = {
			title,
			author,
			url
		}
    createBlog(blogObj)
    setTitle('')
		setAuthor('')
		setUrl('')
    setMessage({content: `a new blog ${title} by ${author} added`, type:'info'})
      setTimeout(() => {
        setMessage(null)
      },5000)
		
  }
    
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title: <input 
          name="Title"
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        author: <input 
          name="Author"
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: <input 
          name="Url"
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm