/**
 * Define the database schema for learning objects.
 */

import {
    collection, unique, text, auto, fixed, foreign, field,
    Edit, Update, Insert, Record,
} from './db.schema';

import { UserID } from './user.schema';
import { LearningOutcomeID } from './learning-outcome.schema';

import { DBID } from './db.schema';


import { Repository } from 'clark-entity';

export type LearningObjectID = DBID;

@collection('objects')
export abstract class LearningObjectSchema {
    @auto @fixed @field
    static _id: LearningObjectID;

    @fixed @foreign('users', false, 'objects') @unique @field
    static authorID: UserID;

    @unique @field
    static name_: string;

    @field
    static date: string;

    @field
    static length_: string;

    @field
    static goals: LearningGoalInterface[];

    @foreign('outcomes', true) @field
    static outcomes: LearningOutcomeID[];

    @field
    static repository: Repository;
}

/**
 * Defines learning goal subdocument schema.
 */
export interface LearningGoalInterface {
    text: string;
}

/**
 * Defines neutrino repository subdocument schema.
 */
export interface RepositoryInterface {
    files: LearningObjectFileInterface[];
    urls: LearningObjectUrlInterface[];
    notes: string;
}

/**
 * Defines neutrino file subdocument schema.
 */
export interface LearningObjectFileInterface {
    id: string;
    name: string;
    fileType: string;
    url: string;
    date: string;
}

/**
 * Defines neutrino url subdocument schema.
 */
export interface LearningObjectUrlInterface {
    title: string;
    url: string;
}

/* FIXME: There has got to be a way to auto-generate the
          following interfaces from the above schema. */

// all auto fields
export interface LearningObjectRecord extends Record, LearningObjectInsert {
    _id: LearningObjectID;
}

// add in fixed fields
export interface LearningObjectInsert extends Insert, LearningObjectUpdate {
    authorID: UserID;
}

// add in foreign fields
export interface LearningObjectUpdate extends Update, LearningObjectEdit {
    outcomes: LearningOutcomeID[];
}

// add in remaining fields
export interface LearningObjectEdit extends Edit {
    name_: string;
    date: string;
    length_: string;
    goals: LearningGoalInterface[];
    repository: Repository;
}
