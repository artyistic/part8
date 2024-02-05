import { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { ALLBOOKS, CREATEBOOK } from '../queries'
import { updateBooksCache } from '../App'
import { MsgContext } from '../contexts'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const {setMsg} = useContext(MsgContext)

  const [ createBook ] = useMutation(CREATEBOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setMsg(messages)
    },
    update: (cache, response) => {
      console.log("UPDATING")
      updateBooksCache(cache, {query: ALLBOOKS}, response.data.allBooks)
    },
  })

  const submit = async (event) => {
    event.preventDefault()
    console.log('add book...')

    await createBook(
      { 
        variables: {title, author, published: parseInt(published), genres} 
      }
    )

    console.log('added book')

    setTitle('')
    setPublished('')  
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook