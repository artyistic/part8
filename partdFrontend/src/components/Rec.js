import { useQuery } from "@apollo/client"
import { REC } from "../queries"

const Rec = () => {
  const favBooks = useQuery(REC)

  if (favBooks.loading) {
    return <div>Loading...</div>
  }

  

  return (
    <>
      <h2>recommendations</h2>
      books in your favorite genre <b>{favBooks.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favBooks.data.getUserFavBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Rec