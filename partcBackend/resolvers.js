const Book = require('./models/Book.js')
const Author = require('./models/Author.js')
const User = require('./models/User.js')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

// only for subscriptions to work
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return Book.find({}).populate('author')
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      const books = await Book.find({})
      const mergeDedupe = (arr) => {
        return [...new Set([].concat(...arr))];
      }
      const genresArrays = books.map(b => b.genres)
      return mergeDedupe(genresArrays)
    },
    filterBooksByGenre: async (root, args) => {
      if (args.genre === '') {
        return Book.find({}).populate('author')
      }
      return Book.find({
        $expr: {
          $in: [
            args.genre,
            "$genres"
          ]
        }
      }).populate('author')
    },
    getUserFavBooks: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Please login (provide bearer token) before adding book', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const favoriteGenre = context.currentUser.favoriteGenre
      return Book.find({
        $expr: {
          $in: [
            favoriteGenre,
            "$genres"
          ]
        }
      }).populate('author')
    }

  },
  Mutation: {
    addBook: async (root, args, context) => {
      // check authentication
      if (!context.currentUser) {
        throw new GraphQLError('Please login (provide bearer token) before adding book', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }

      var author = await Author.exists({name: args.author})
      if (!author) {
        const newAuthor = new Author({name: args.author, bookCount: 1})
        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Saving new author from addBook failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      const newBook = new Book({title: args.title, published: args.published, genres: args.genres, author: author})
      try {
        await newBook.save()
      } catch (error) {
        // delete the new author if there is a newAuthor
        if (author.bookCount == 1) {
          await Author.findOneAndDelete({name: args.author})
        }
        throw new GraphQLError('Saving new book from addBook failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      // for subscription
      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook

    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Please login (provide bearer token) before editing author', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      return Author.findOneAndUpdate({name: args.name}, { $set: {born: args.setBornTo }})
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }

}

module.exports = resolvers