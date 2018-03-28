import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql'

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    organization: { type: GraphQLString },
    password: { type: GraphQLString },
    objects: { type: GraphQLList(GraphQLString) },
    emailVerified: { type: GraphQLBoolean },
  })
})