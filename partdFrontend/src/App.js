import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Account from './components/Account'
import ErrMsg from './components/ErrMsg'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const padding = {
    padding: 5
  }

  const [error, setError] = useState('')
  const [token, setToken] = useState(null)

  return (
    <div>
      <ErrMsg msg={error}/>
      <Router>
      <div>
        <Link style={padding} to="/authors">authors</Link>
        <Link style={padding} to="/books">books</Link>
        {localStorage.getItem('user-token') && <Link style={padding} to="/addBook">add a book</Link>}
        <Link style={padding} to="/login">Account</Link>
      </div>

      <Routes>
        <Route path='/authors' element={<Authors/>}></Route>
        <Route path='/books' element={<Books/>}></Route>
        <Route path='/addBook' element={<NewBook/>}></Route>
        <Route path='/' element={<Books/>}></Route>
        <Route path='/login' element={<Account setToken={setToken} setError={setError} token={token}/>}/>
      </Routes>
    </Router>
    </div>
  )
}

export default App
