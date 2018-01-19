/**
 * Define the database schema for Bloomin' Onion users.
 */

import {
    collection, unique, text, auto, fixed, foreign, field,
    Edit, Update, Insert, Record,
} from './db.schema';

import { LearningObjectID } from './learning-object.schema';

import { DBID } from './db.schema';
export type UserID = DBID;

@collection('users')
export abstract class UserSchema {
    @auto @fixed @field
    static _id: UserID;

    @unique @field
    static id: string;

    @field
    static name_: string;

    @field
    static email: string;

    @field
    static pwdhash: string;

    @foreign('objects', true) @field
    static objects: LearningObjectID[];
}

/* FIXME: There has got to be a way to auto-generate the
          following interfaces from the above schema. */

// all auto fields
export interface UserRecord extends Record, UserInsert {
    _id: UserID;
}

// add in fixed fields
export interface UserInsert extends Insert, UserUpdate {}

// add in foreign fields
export interface UserUpdate extends Update, UserEdit {
    objects: LearningObjectID[];
}

// add in remaining fields
export interface UserEdit extends Edit {
    username: string;
    name_: string;
    email: string;
    pwdhash: string;
}
