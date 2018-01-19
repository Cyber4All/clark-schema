import { Record } from './db.schema';

import { LearningOutcomeID } from './learning-outcome.schema';
import { StandardOutcomeID } from './standard-outcome.schema';
export type OutcomeID = LearningOutcomeID|StandardOutcomeID;

/**
 * Defines assessment plan subdocument schema.
 */
export interface AssessmentPlanInterface {
    plan: string;
    text: string;
}

/**
 * Defines instructional strategy subdocument schema.
 */
export interface InstructionalStrategyInterface {
    instruction: string;
    text: string;
}

/**
 * Defines generic outcome schema (both learning and standard).
 */
export interface OutcomeRecord extends Record {
    _id: OutcomeID;
    author: string;
    name_: string;
    date: string;
    outcome: string;
}
