import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/authors">authors</Link>
        <Link style={padding} to="/books">books</Link>
        <Link style={padding} to="/addBook">add a book</Link>
      </div>

      <Routes>
        <Route path='/authors' element={<Authors/>}></Route>
        <Route path='/books' element={<Books/>}></Route>
        <Route path='/addBook' element={<NewBook/>}></Route>
        <Route path='/' element={<Books/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
