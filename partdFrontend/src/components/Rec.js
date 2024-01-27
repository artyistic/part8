import { useQuery } from "@apollo/client"
import { FILTERBOOKSBYGENRE, LOGGEDINUSER } from "../queries"

const Rec = () => {
  const user = useQuery(LOGGEDINUSER)
  const recs = useQuery(FILTERBOOKSBYGENRE, {
    variables: {genre: user.data.me.favoriteGenre}
  })

  if (user.loading || recs.loading) {
    return <div>Loading...</div>
  }

  

  return (
    <>
      <h2>recommendations</h2>
      books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recs.data.filterBooksByGenre.map((a) => (
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