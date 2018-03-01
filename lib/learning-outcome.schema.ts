/**
 * Define the database schema for learning outcomes.
 */

export type LearningOutcomeDocument = {
  _id?: string;
  source: string;
  tag: number;
  author: string;
  name: string;
  date: string;
  outcome: string;
  bloom: string;
  verb: string;
  text: string;
  assessments: AssessmentPlanDocument[];
  strategies: InstructionalStrategyDocument[];
  mappings: string[];
};
export type AssessmentPlanDocument = { plan: string; text: string };

export type InstructionalStrategyDocument = { plan: string; text: string };
