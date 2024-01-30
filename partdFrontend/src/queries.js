import { gql } from "@apollo/client";

const BOOK_DETAIL = gql `
  fragment bookDetails on Book {
    title
    published
    author {
      bookCount
      name
    }
  }
`

const ALLBOOKS = gql `
	query AllBooks {
		allBooks {
			...bookDetails
	  }
  }
  ${BOOK_DETAIL}
`

const ALLAUTHORS = gql `
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

const CREATEBOOK = gql `
	mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
		addBook (
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...bookDetails
	  }
	}
  ${BOOK_DETAIL}
`

const CHANGEAUTHOR = gql `
	mutation changeAuthor($name: String!, $setBornTo: Int!) {
		editAuthor (
			name: $name
			setBornTo: $setBornTo
		) {
      name
    }
	}
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const ALLGENRES = gql`
  query {
    allGenres
  }
`

const FILTERBOOKSBYGENRE = gql`
  query FilterBooksByGenre($genre: String!) {
    filterBooksByGenre(genre: $genre) {
			...bookDetails
	  }
  }
  ${BOOK_DETAIL}
`

const LOGGEDINUSER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export { ALLBOOKS, ALLAUTHORS, CREATEBOOK, CHANGEAUTHOR, LOGIN, ALLGENRES, FILTERBOOKSBYGENRE, LOGGEDINUSER }