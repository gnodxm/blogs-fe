import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [message,setMessage] = useState(null)
  const blogFormRef= useRef()

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

  const login = async (username, password) => {
    try {
      const loggedUser = await loginService.login({username, password}) 
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      window.localStorage.setItem('loggedUser',JSON.stringify(loggedUser))
    } catch (exception){
      setMessage({content: 'Wrong username or password', type:'error'})
			console.log(message);
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
  }


  const createBlog =  async (blogObj) => {
		
		blogService.setToken(user.token)
    const savedBlog = await blogService.create(blogObj)
		setBlogs(blogs.concat(savedBlog),'newBLog')
    console.log(savedBlog)
    blogFormRef.current.toggleVisibility()
  }

  const updateBlog = async (id, blogObj) => {
    await blogService.update(id, blogObj)
    setBlogs(blogs.map(blog => {
      return blog.id === id? blogObj: blog
    }))
  }

  const removeBlog = async (id) => {
    blogService.setToken(user.token)
    await blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id  ))
  }

  return (
    <div>
      <h2>blogs</h2>
			<Notification message={message} />
      {!user && <Togglable buttonLabel='login' >
        <LoginForm 
          login={login}
          setMessage={setMessage}
        />
      </Togglable>}
      {user && <div>
        <p>{user.name} logged in <button 
            onClick={()=> {
              window.localStorage.clear()
              setUser(null)  
            }}>
              logout
        </button></p>
        <Togglable buttonLabel='create Blog' ref={blogFormRef}> 
          <BlogForm
            createBlog={createBlog}
            setMessage={setMessage}
          />
        
        </Togglable>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} 
            blog={blog} 
            updateBlog={updateBlog} 
            username={user.user}
            removeBlog={removeBlog}
        />
      )}
      </div>
      }
      {/* {!user && loginForm()}
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
      )} */}
      
    </div>
  )
}

export default App