/**
 * Tools and universal script for defining database schemas.
 */

export { ObjectID as DBID } from 'mongodb';

import { UserID } from './user.schema';
import { LearningObjectID } from './learning-object.schema';
import { OutcomeID } from './outcome.schema';
export type RecordID = UserID | LearningObjectID | OutcomeID;

/**
 * Generic types to represent various stages of a database document.
 */
export interface Edit { }    // weak update database (no foreign fields)
export interface Update { }  // update database (no fixed fields)
export interface Insert { }  // insert into database (no auto fields)
export interface Record { }  // result from database (all fields)

//////////////////////////////////////////////////
// Access static information about each schema. //
//////////////////////////////////////////////////

/**
 * A structure encapsulating metadata for a foreign key field.
 */
export interface ForeignData {
    target: string;
    child: boolean;
    registry?: string;
}

// private values
let _schemas: { [collection: string]: Function } = {};
let _collections: { [collection: string]: string } = {};
let _foreignData: {
    [collection: string]: { [foreign: string]: ForeignData },
} = {};

let _uniques: { [collection: string]: Set<string> } = {};
let _texts: { [collection: string]: Set<string> } = {};
let _autos: { [collection: string]: Set<string> } = {};
let _fixeds: { [collection: string]: Set<string> } = {};
let _foreigns: { [collection: string]: Set<string> } = {};
let _fields: { [collection: string]: Set<string> } = {};

/**
 * Access a set of all collections in database.
 * @returns {Set<string>}
 */
export function collections(): Set<string> {
    return new Set(Object.keys(_schemas));
}

/**
 * Fetch a specific schema constructor for a collection.
 * NOTE: multiple schemas may use the same collection; this function
 *       will only return one of them, and makes no promises which
 *
 * @param {string} collection a collection in the database
 *
 * @returns {Function} the schema constructor tied to collection
 */
export function schemaFor(collection_: string): Function {
    return _schemas[collection_];
}

/**
 * Fetch the collection name a particular schema uses.
 * @param {Function} schema the schema to look up
 *
 * @returns {string} which collection the schema uses
 */
export function collectionFor(schema: Function): string {
    return _collections[schema.name];
}

/**
 * Fetch foreign key metadata for a field in a particular schema.
 * @param {Function} schema the schema to look up
 * @param {string} foreign the foreign field to look up
 *
 * @returns {ForeignData}
 */
export function foreignData(schema: Function, foreign_: string): ForeignData {
    return _foreignData[schema.name][foreign_];
}


/**
 * Fetch the unique key for a particular schema.
 * @param {Function} schema the schema to look up
 *
 * @returns {Set<string>} a set of field names
 */
export function uniquesFor(schema: Function): Set<string> {
    return _uniques[schema.name];
}


/**
 * Fetch text-indexed fields for a particular schema.
 * @param {Function} schema the schema to look up
 *
 * @returns {Set<string>} a set of field names
 */
export function textsFor(schema: Function): Set<string> {
    return _texts[schema.name];
}


/**
 * Fetch all auto-generated fields for a particular schema.
 * @param {Function} schema the schema to look up
 *
 * @returns {Set<string>} a set of field names
 */
export function autosFor(schema: Function): Set<string> {
    return _autos[schema.name];
}


/**
 * Fetch all fixed fields for a particular schema.
 * @param {Function} schema the schema to look up
 *
 * @returns {Set<string>} a set of field names
 */
export function fixedsFor(schema: Function): Set<string> {
    return _fixeds[schema.name];
}


/**
 * Fetch all foreign fields for a particular schema.
 * @param {Function} schema the schema to look up
 *
 * @returns {Set<string>} a set of field names
 */
export function foreignsFor(schema: Function): Set<string> {
    return _foreigns[schema.name];
}


/**
 * Fetch all the fields for a particular schema.
 * @param {Function} schema the schema to look up
 *
 * @returns {Set<string>} a set of field names
 */
export function fieldsFor(schema: Function): Set<string> {
    return _fields[schema.name];
}

//////////////////////////////////////////////////
// Provide decorators for schemas,              //
// which register the static information above. //
//////////////////////////////////////////////////

/**
 * Schema decorator to associate the schema with a database collection
 * NOTE: multiple schemas may use the same collection, but only one
 *       of these schemas will be used to generate unique and text
 *       indexes, and for cascade deletion. As such, they ought all
 *       define the same @unique, @text, and @foreign(~, true) fields.
 *
 * @param {string} name the name of the database collection
 */
export function collection(name: string) {
    return function (schema: Function) {
        _schemas[name] = schema;
        _collections[schema.name] = name;
    };
}

/**
 * Field decorator to indicate it is part of the schema's unique key.
 */
export function unique(schema: Function, name: string) {
    if (!(schema.name in _uniques)) _uniques[schema.name] = new Set<string>();
    _uniques[schema.name].add(name);
}

/**
 * Field decorator to indicate it should be used in a text index.
 */
export function text(schema: Function, name: string) {
    if (!(schema.name in _texts)) _texts[schema.name] = new Set<string>();
    _texts[schema.name].add(name);
}
/**
 * Field decorator to indicate the field is auto-generated.
 * NOTE: The database driver is responsible for ensuring specific
 *       constraints beyond immutability and foreign key.
 */
export function auto(schema: Function, name: string) {
    if (!(schema.name in _autos)) _autos[schema.name] = new Set<string>();
    _autos[schema.name].add(name);
}

/**
 * Field decorator to indicate the field will never change.
 */
export function fixed(schema: Function, name: string) {
    if (!(schema.name in _fixeds)) _fixeds[schema.name] = new Set<string>();
    _fixeds[schema.name].add(name);
}

/**
 * Field decorator to declare value as a foreign key (or list of them).
 * @param target the collection to find the key(s) in
 * @param child true iff deleting this record should cascade to the key
 * @param registry (optional) name of the foreign document's array
 *                 property which should include this record's id
 *
 * NOTE: registered fields must also be fixed, to guarantee integrity
 */
export function foreign(target: string, child: boolean, registry?: string) {
    return function (schema: Function, name: string) {
        if (!(schema.name in _foreigns)) _foreigns[schema.name] = new Set<string>();
        _foreigns[schema.name].add(name);

        if (!(schema.name in _foreignData)) _foreignData[schema.name] = {};
        _foreignData[schema.name][name] = <ForeignData>{
            target: target,
            child: child,
            registry: registry,
        };
    };
}

/**
 * Field decorator to indicate property is in fact a field.
 */
export function field(schema: Function, name: string) {
    if (!(schema.name in _fields)) _fields[schema.name] = new Set<string>();
    _fields[schema.name].add(name);
}
