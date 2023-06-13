import { useState } from "react";

const LoginForm = ({login}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    await login(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
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
}

export default LoginForm