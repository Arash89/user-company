const graphql = require('graphql')
const userMongooseModel = require('../user_model')
const companyMongooseModel = require('../company_model')
const console = require('../util')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql

const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  fields: () => ({
    id: { type: GraphQLString },
    companyName: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parentValue, args) {
        console.cyan('Parent Value: ', parentValue)
        console.yellow('Args Value: ', parentValue)

        // return userMongooseModel.find({companyName: parentValue.id}).clone().catch((err) => console.log(err))
        return await userMongooseModel.find({companyName: parentValue.id})
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    companyName: {
      type: CompanyType,
      async resolve(parentValue, args) {
        console.cyan('Parent Value: ', parentValue)
        console.yellow('Args Value: ', parentValue)
        // return companyMongooseModel.findById(parentValue.companyName).clone().catch((err) => console.log(err))
        return await companyMongooseModel.findById(parentValue.companyName)
      }
    },
  })
})

// module.exports = UserType

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        console.red("Salam id", args.id)
        // return userMongooseModel.findById(args.id).clone().catch((err) => console.log(err))
        return await userMongooseModel.findById(args.id)
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        // return companyMongooseModel.findById(args.id).clone().catch((err) => console.log(err))
        return await companyMongooseModel.findById(args.id)
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    AddUser: {
      type: UserType,
      args: {
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        age: { type: GraphQLInt },
        companyName: { type: GraphQLString },
      },
      resolve(parentValue, { firstName, age, companyName } ) {
        const newUser = new userMongooseModel({
          firstName,
          age,
          companyName,
        })
        return newUser.save()
      }
    },
    DeleteUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parentValue, { firstName }) {
        // return userMongooseModel.findOneAndDelete({ firstName }).clone().catch((err) => console.log(err))
        return await userMongooseModel.findOneAndDelete({ firstName })
      }
    },
    UpdateUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        newFirstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyName: { type: GraphQLString }
      },
      async resolve (parentValue, { firstName, age, companyName, newFirstName }) {
        const criteria = {}
        if (newFirstName) {
          criteria.firstName = newFirstName
        }

        if (age) {
          criteria.age = age
        }

        if (companyName) {
          criteria.companyName = companyName
        }

        // return userMongooseModel.findOneAndUpdate({firstName}, criteria).clone().catch((err) => console.log(err))
        return await userMongooseModel.findOneAndUpdate({firstName}, criteria)
      }
    }
  }
})

const graphQLSchema = new GraphQLSchema({
  query: RootQuery,
  mutation
})

module.exports = graphQLSchema


//point:
// https://stackoverflow.com/questions/68945315/mongooseerror-query-was-already-executed
