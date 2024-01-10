import { useMutation } from "@apollo/client"
import { CHANGEAUTHOR, ALLAUTHORS } from "../queries"
import { useState } from "react"
import Select from 'react-select'

const ChangeAuthor = ({ authors }) => {

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    }
  })

  const [authorToChange, setAuthorToChange] = useState(null)
  const [year, setYear] = useState('')

  const [ changeAuthor ] = useMutation(CHANGEAUTHOR,
    {refetchQueries: [ { query: ALLAUTHORS } ]  
  })

  const submit = async (event) => {
    event.preventDefault()

    console.log("updating Authors...")
    console.log(authorToChange, year)
    
    await changeAuthor(
      {
        variables: {name: authorToChange.value, setBornTo: parseInt(year)}
      }
    )
    
  }

  return (
    // <div>
    //   <h3>Set birthyear</h3>
    //   <form onSubmit={submit}>
    //     <div>
    //       name
    //       <input
    //         value={authorToChange}
    //         onChange={({ target }) => setAuthorToChange(target.value)}
    //       />
    //     </div>
    //     <div>
    //       born
    //       <input
    //         type="number"
    //         value={year}
    //         onChange={({ target }) => setYear(target.value)}
    //       />
    //     </div>
    //     <button type="submit">update Author</button>
    //   </form>
    // </div>   
    <div>
      <h3>Set birthyear</h3>
      <Select
        onChange={setAuthorToChange}
        options={options}
      />
      <form onSubmit={submit}>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>   
  )
}

export default ChangeAuthor