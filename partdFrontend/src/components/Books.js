import { useQuery } from "@apollo/client"
import { ALLGENRES, FILTERBOOKSBYGENRE } from "../queries"
import { useState } from "react"

const Books = () => {

  const [filter, setFilter] = useState('')
  const allBooks = useQuery(FILTERBOOKSBYGENRE, {
    variables: {genre: filter}
  })
  const allGenres = useQuery(ALLGENRES)

  

  if (allBooks.loading || allGenres.loading) {
    return <div>Loading...</div>
  }

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
          {allBooks.data.filterBooksByGenre.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.data.allGenres.map(genre => {
          return <button onClick={() => setFilter(genre)}>{genre}</button>
        })}
        <button onClick={() => setFilter('')}>all Genres</button>
      </div>
    </>
  )
}

export default Books
