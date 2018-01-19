/**
 * Define the database schema for learning outcomes.
 */

import {
    collection, unique, text, auto, fixed, foreign, field,
    Edit, Update, Insert, Record,
} from './db.schema';

import { LearningObjectID } from './learning-object.schema';
import {
    OutcomeID, OutcomeRecord,
    AssessmentPlanInterface, InstructionalStrategyInterface,
} from './outcome.schema';

import { DBID } from './db.schema';
export type LearningOutcomeID = DBID;

@collection('outcomes')
export abstract class LearningOutcomeSchema {
    @auto @fixed @field
    static _id: LearningOutcomeID;

    @unique @fixed @foreign('objects', false, 'outcomes') @field
    static source: LearningObjectID;

    @unique @fixed @field
    static tag: number;

    @auto @field
    static author: string;  // source's author's name

    @auto @field
    static name_: string;   // source's name

    @auto @field
    static date: string;    // source's last-modified date

    @auto @text @field
    static outcome: string; // verb + text together

    @field
    static bloom: string;

    @field
    static verb: string;

    @field
    static text: string;

    @field
    static assessments: AssessmentPlanInterface[];

    @field
    static strategies: InstructionalStrategyInterface[];

    @foreign('outcomes', false) @field
    static mappings: OutcomeID[];
}

/* FIXME: There has got to be a way to auto-generate the
          following interfaces from the above schema. */

// all auto fields
export interface LearningOutcomeRecord extends OutcomeRecord, LearningOutcomeInsert {
    _id: LearningOutcomeID;
}

// add in fixed fields
export interface LearningOutcomeInsert extends Insert, LearningOutcomeUpdate {
    source: LearningObjectID;
    tag: number;
}

// add in foreign fields
export interface LearningOutcomeUpdate extends Update, LearningOutcomeEdit {
    mappings: OutcomeID[];
}

// add in remaining fields
export interface LearningOutcomeEdit extends Edit {
    bloom: string;
    verb: string;
    text: string;
    assessments: AssessmentPlanInterface[];
    strategies: InstructionalStrategyInterface[];
}
