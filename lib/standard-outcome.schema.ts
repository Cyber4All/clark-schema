/**
 * Define the database schema for standard outcomes.
 */
import {
    collection, unique, text, auto, fixed, foreign, field,
    Edit, Update, Insert, Record,
} from './db.schema';

import { OutcomeRecord } from './outcome.schema';

import { DBID } from './db.schema';
export type StandardOutcomeID = DBID;

@collection('outcomes')
export abstract class StandardOutcomeSchema {
    @auto @fixed @field
    static _id: StandardOutcomeID;

    @fixed @field
    static author: string;

    @fixed @field
    static name_: string;

    @fixed @field
    static date: string;

    @auto @fixed @text @field
    static outcome: string;

    // the following two fields are needed solely to facilitate unique index for learning outcomes
    @auto @unique @fixed @field
    static source: string;  // alias for author

    @auto @unique @fixed @field
    static tag: string; // alias for outcome
}

/* FIXME: There has got to be a way to auto-generate the
          following interfaces from the above schema. */

// all auto fields
export interface StandardOutcomeRecord extends OutcomeRecord, StandardOutcomeInsert {
    _id: StandardOutcomeID;
    source: string;
    tag: string;
}

// add in fixed fields
export interface StandardOutcomeInsert extends Insert, StandardOutcomeUpdate {
    author: string;
    name_: string;
    date: string;
    outcome: string;
}

// add in foreign fields
export interface StandardOutcomeUpdate extends Update, StandardOutcomeEdit { }

// add in remaining fields
export interface StandardOutcomeEdit extends Edit { }

