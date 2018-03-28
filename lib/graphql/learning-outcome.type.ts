import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql'

export const AssessmentPlanType = new GraphQLObjectType({
  name: 'AssessmentPlan',
  fields: () => ({
    plan: { type: GraphQLString },
    text: { type: GraphQLString },
  })
})

export const InstructionalStrategyType = new GraphQLObjectType({
  name: 'InstructionalStrategy',
  fields: () => ({
    plan: { type: GraphQLString },
    text: { type: GraphQLString },
  })
})

export const LearningOutcomeType = new GraphQLObjectType({
  name: 'LearningOutcome',
  fields: () => ({
    _id: { type: GraphQLString },
    source: { type: GraphQLString },
    tag: { type: GraphQLInt }, // TODO check if int or float?
    author: { type: GraphQLString },
    name: { type: GraphQLString },
    date: { type: GraphQLString },
    outcome: { type: GraphQLString },
    bloom: { type: GraphQLString },
    verb: { type: GraphQLString },
    text: { type: GraphQLString },
    assessments: { type: GraphQLList(AssessmentPlanType) },
    strategies: { type: GraphQLList(InstructionalStrategyType) },
    mappings: { type: GraphQLList(GraphQLString) },
  })
})