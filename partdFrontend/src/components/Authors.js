import { useQuery } from "@apollo/client"
import { ALLAUTHORS } from "../queries"
import ChangeAuthor from "./ChangeAuthor"
import { AuthContext } from "../contexts"
import { useContext } from "react"

const Authors = () => {

  const result = useQuery(ALLAUTHORS)
  const {token} = useContext(AuthContext)

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <ChangeAuthor authors={result.data.allAuthors}/>} 
    </div>
  )
}

export default Authors
