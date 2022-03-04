const tracer = require('dd-trace').init()
require('custom-env').env()
const express = require('express')
const path = require('path')

const mongoose = require('mongoose')
const userMongooseModel = require('./user_model')
const companyMongooseModel = require('./company_model')

const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
// const expressGraphQL = require('express-graphql').graphqlHTTP
const cors = require("cors"); //cross-origin-resource sharing
const { ApolloServer, gql } = require('apollo-server');

const {
  onceCallback,
  addUserCallback,
  updateUserFormResultCallBack,
  addUserFormResultCallBack,
  addCompanyFormResultCallback,
  formAddCallback,
  formUpdateCallback,
} = require("./GraphQL/routCallbacks");
const graphQLSchema = require('./GraphQL/UserType')
const console = require('./util')

const app = express()

// app.use('/graphql', graphqlHTTP({
//   schema: graphQLSchema,
//   graphiql: true
// }))

// for body parser to work
app.use(bodyParser.json())
app.use(express.urlencoded());

// app.use(
//   cors({
//     optionsSuccessStatus: 200, //option sucess status
//     origin: "http://localhost:3000", //origin allowed to access the server
//   })
// );

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

console.blue(process.env.MONGODB_URI)
console.yellow(process.env.SALAM)

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
})

console.blue(process.env.MONGODB_URI)
console.yellow(process.env.SALAM)

app.get('/once', onceCallback)

app.get('/adduser', addUserCallback)

app.post('/updateuserformResult', updateUserFormResultCallBack)

app.post('/adduserformResult', addUserFormResultCallBack)

app.post('/addcompanyformResult', addCompanyFormResultCallback)

app.get('/formadd', formAddCallback)

app.get('/formupdate', formUpdateCallback)

// app.listen('7777')
// console.cyan('Server is running......c')

// const typeDefs = gql`
//     type User {
//         firstName: String,
//         age: Int,
//         companyName: String,
//     }
//     type Comapny {
//         companyName: String,
//         description: String,
//         users: [User]
//     }
// `
//
// const resolvers = {
//   Query: {
//     users: (parentValue, args) => userMongooseModel.findById(args.id),
//     company: (parentValue, args) => companyMongooseModel.findById(args.id)
//   },
// };

// const server = new ApolloServer({ typeDefs, resolvers });
const server = new ApolloServer({ schema: graphQLSchema });
// userMongooseModel.find().then(data => console.red(data))


// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// addUser url
// http://localhost:7777/adduser?firstName=Alireza&age=33

// graphiql
// http://localhost:7777/graphql


// This is how we connect once based on Stephen's instruction
// but without it still we are connected
// const connection = mongoose.connection
//   .once('open', () => {
//
//     UserModel.findByIdAndUpdate({"_id": '61991eda2dfb6b6189d17f65'}, {
//       $set: {
//         age: 3
//       }
//     }, {new: true})
//
//     console.red('Connected to MongoLab instance.')
//   })
//   .on('error', error => console.log('Error connecting to MongoLab:', error));
