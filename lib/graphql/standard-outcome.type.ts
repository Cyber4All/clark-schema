import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql'

export const StandardOutcomeType = new GraphQLObjectType({
  name: 'StandardOutcome',
  fields: () => ({
    _id: { type: GraphQLString },
    author: { type: GraphQLString },
    name: { type: GraphQLString },
    date: { type: GraphQLString },
    outcome: { type: GraphQLString },
    source: { type: GraphQLString },
    tag: { type: GraphQLString },
  })
})