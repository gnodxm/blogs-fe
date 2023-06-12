import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message,setMessage] = useState(null)
	// const [messageClass, setMessageClass] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception){
      setMessage({content: 'Wrong username or password', type:'error'})
			console.log(message);
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
  }


  const createBlog =  async (event) => {
    event.preventDefault()
		const blogObj = {
			title,
			author,
			url
		}

		blogService.setToken(user.token)
    const savedBlog = await blogService.create(blogObj)
		setBlogs(blogs.concat(savedBlog))
		const infoMessage = `a new blog ${title} by ${author} added`
		setTitle('')
		setAuthor('')
		setUrl('')
		setMessage({content: infoMessage, type:'info'})
      setTimeout(() => {
        setMessage(null)
      },5000)
		
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input  
          type='text'
          name='Username'
          value={username}
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password <input 
          type='password'
          name='Password'
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>

  )

  const blogForm = () => (
    <form onSubmit={createBlog}>
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

  return (
    <div>
      <h2>blogs</h2>
			<Notification message={message} messageClass />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in <button 
            onClick={()=> {
              window.localStorage.clear()
              setUser(null)  
            }}>
              logout
            </button></p>
            <h2>create new</h2>
            {blogForm()}
          {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        </div>
      )}
      
    </div>
  )
}

export default App