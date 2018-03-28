import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

export const CollectionType = new GraphQLObjectType({
  name: { type: GraphQLString },
  // TODO swap string for LO type to be able to resolve the full object if needed
  learningObjects: { type: GraphQLList(GraphQLString) },
})