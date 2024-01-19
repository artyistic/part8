import { gql } from "@apollo/client";

const ALLBOOKS = gql `
	query AllBooks {
		allBooks {
			title
			published
      author {
        bookCount
        name
      }
		}
	}
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
			title
			published
      author {
        bookCount
        name
      }
		}
	}
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
export { ALLBOOKS, ALLAUTHORS, CREATEBOOK, CHANGEAUTHOR }