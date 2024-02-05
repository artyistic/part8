import { useEffect, useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Account from './components/Account'
import ErrMsg from './components/ErrMsg'
import Rec from './components/Rec.js'

import { AuthContext } from './contexts.js'
import { MsgContext } from './contexts.js'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import { useSubscription } from '@apollo/client'
import { ALLBOOKS, BOOK_ADDED } from './queries.js'

export const updateBooksCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item._id
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({allBooks}) => {
    console.log("here")
    return {
      allBooks: uniqByName(allBooks.concat(addedBook))
    }
  })
}

const App = () => {
  const padding = {
    padding: 5
  }

  const [error, setError] = useState('')
  const [token, setToken] = useState(null)
  const AuthValue = { token, setToken }

  const popup = (msg) => {
    setError(msg)
    setTimeout(() => setError(''), 5000)
  }

  const ErrValue = { msg: error, setMsg: popup }

  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({data, client}) => {
      const addedBook = data.data.bookAdded
      alert(`Book ${addedBook.title} added`)

      // updating the cache so book list updates immediately
      updateBooksCache(client.cache, {query: ALLBOOKS}, addedBook)
    }
  })

  return (
    <MsgContext.Provider value={ErrValue}>
      <AuthContext.Provider value={AuthValue}>
        <ErrMsg msg={error}/>
        <Router>
          <div>
            <Link style={padding} to="/authors">authors</Link>
            <Link style={padding} to="/books">books</Link>
            {token && <Link style={padding} to="/addBook">add a book</Link>}
            {token && <Link style={padding} to="/recommendations">recommendations</Link>}
            <Link style={padding} to="/login">Account</Link>
          </div>
          <Routes>
            <Route path='/authors' element={<Authors/>}></Route>
            <Route path='/books' element={<Books/>}></Route>
            <Route path='/addBook' element={<NewBook/>}></Route>
            <Route path='/' element={<Books/>}></Route>
            <Route path='/login' element={<Account/>}/>
            <Route path='/recommendations' element={<Rec/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </MsgContext.Provider>
  )
}

export default App
