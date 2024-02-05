import { useQuery } from "@apollo/client"
import { ALLBOOKS, ALLGENRES } from "../queries"
import { useState } from "react"

const Books = () => {

  const [filter, setFilter] = useState('')
  // const allBooks = useQuery(FILTERBOOKSBYGENRE, {
  //   variables: {genre: filter}
  // })
  const allBooks = useQuery(ALLBOOKS)
  const allGenres = useQuery(ALLGENRES)

  

  if (allBooks.loading || allGenres.loading) {
    return <div>Loading...</div>
  }

  const books = filter !== '' ? allBooks.data.allBooks.filter(b => b.genres.includes(filter)) : allBooks.data.allBooks

  return (
    <>
      <h2>books</h2>
      in genre <b>{filter !== '' ? filter : "all Genres"}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a._id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.data.allGenres.map(genre => {
          return <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        })}
        <button onClick={() => setFilter('')}>all Genres</button>
      </div>
    </>
  )
}

export default Books
