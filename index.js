const express = require('express')
const graphql = require('graphql')
const { graphqlHTTP } = require('express-graphql')

const data = require('./mockdata.json')
//** https://www.youtube.com/watch?v=Dr2dDWzThK8 youtube mentor
const app = express()
const userType = new graphql.GraphQLObjectType({
    name: "user",
    fields: {
        id: { type: graphql.GraphQLInt },
        firstName: { type: graphql.GraphQLString },
        lastName: { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
    }
})
const rootQuery = new graphql.GraphQLObjectType({
    name: "rootQueryType",
    fields: {
        getAllUser: {
            type: new graphql.GraphQLList(userType),
            args: { id: { type: graphql.GraphQLInt } },
            resolve(parent, args) {
                return data
            }
        }
    }
})
const mutation = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: new graphql.GraphQLList(userType),
            args: {
                firstName: { type: graphql.GraphQLString },
                lastName: { type: graphql.GraphQLString },
                email: { type: graphql.GraphQLString },
                password: { type: graphql.GraphQLString },
            },
            resolve(parent, args) {
                data.push({ id: data.length + 1, ...args })
                return args
            }
        }
    }
})
const schema = new graphql.GraphQLSchema({ query: rootQuery, mutation: mutation })
app.use('', graphqlHTTP({
    schema,
    graphiql: true,

}))
app.listen(3000, () => {
    console.log(`${3000} - portni eshityapman`)
})