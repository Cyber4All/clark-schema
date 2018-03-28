import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql'

export const LearningObjectType = new GraphQLObjectType({
  name: 'LearningObject',
  fields: () => ({
    _id: { type: GraphQLString },
    authorID: { type: GraphQLString },
    name: { type: GraphQLString },
    date: { type: GraphQLString },
    length: { type: GraphQLString },
    levels: { type: GraphQLList(GraphQLString) },
    goals: { type: GraphQLList(LearningGoalType) },
    outcomes: { type: GraphQLList(GraphQLString) },
    materials: { type: MaterialsType },
    published: { type: GraphQLBoolean },
    children: { type: GraphQLList(GraphQLString) },
  })
})

export const LearningGoalType = new GraphQLObjectType({
  name: 'LearningGoal',
  fields: () => ({
    text: { type: GraphQLString }
  })
})

export const FileType = new GraphQLObjectType({
  name: 'File',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    fileType: { type: GraphQLString },
    url: { type: GraphQLString },
    date: { type: GraphQLString },
  })
})

export const UrlType = new GraphQLObjectType({
  name: 'URL',
  fields: () => ({
    title: { type: GraphQLString },
    url: { type: GraphQLString },
  })
})

export const MaterialsType = ({
  name: 'Materials',
  fields: () => ({
    files: { type: FileType },
    urls: { type: UrlType },
    notes: { type: GraphQLString },
  })
})
