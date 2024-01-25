import { useContext, useState } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../contexts'

const LoginForm = ({ setError }) => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const client = useApolloClient()
  const {token, setToken} = useContext(AuthContext) 

  const [ login ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      navigate('../authors')
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('user-token')
    client.resetStore()
  }

  // important to check localstorage instead of the state token
  if (token) {
    return (
      <div>
        <h1>You are logged in</h1>
        <button onClick={logout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm