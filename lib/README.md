# Schema Guide
This guide documents how to work with database schemas.

Changes to a schematic must happen in two places:
1) the abstract 'Schema' class with static properties for each field
2) the 'Record', 'Insert', 'Update', and 'Edit' interfaces defined afterwards
Details for each are in the sections below.

## File Convention
Both the class and the interfaces should be defined in a *.schema.ts file, where the * is the entity being represented, all lower case and with words separated by hyphens (ex. 'learning-outcome.schema.ts').

## Defining a Schema Class
A schema is defined primarily with an abstract class consisting only of decorated static properties termed 'fields', which are (as everything in TypeScript must be) given a type. The class itself should be decorated with @collection('somename'), where 'somename' is the string name of the database collection this schema will be stored in.

Example:
@collection('myCollection')
abstract class SomeSchema {
    @decorator1 @decorator2 ...
    static propertyName: propertyType;
}

NOTE: Every TypeScript class has several native static properties, since static properties are actually technically just properties of the constructor object. If you find that you'd like to name your field one of these 'reserved' words, you'll have to put an underscore after it (ex. 'static name_: string;').

NOTE: Giving each field a type in the Schema class doesn't actually do anything, since when we work with the objects themselves, we'll actually be using the interfaces described below. But it's probably a good idea for the Schema class to have all the information anyways.

### Naming Convention
The class name should be the name of the represented entity, appended with the word 'Schema'. (ex. LearningOutomeSchema).

### Field Decorators

#### @field
Use for all fields.

This distinguishes the field properties from all the native properties of the constructor object.

#### @unique
Use for members of the unique key.

This tells the database initialization script which properties to create a unique index on.

#### @text
Use for text-searchable fields.

This tells the database initialization script which properties to create a text index on.

#### @auto
Use for auto-generated fields.

This distinguishes those fields which are in a database record (ie. 'Record'), but not in an insert document (ie. 'Insert').

NOTE: The database driver is responsible for ensuring specific constraints required for each field, on insertion, updates, _and_ edits.

#### @fixed
Use for immutable fields.

This distinguishes those fields which are in an insert document (ie. 'Insert'), but not in an update document ('Update', 'Edit').

#### @foreign(string, boolean[, string])
Use for fields which will hold a foreign key, or an array of foreign keys.

The first argument is the name of the database collection the key(s) point to. Insert, update, and edit database driver functions ensure each key exists in the stated collection.

The second argument indicates whether the key(s) pointed to are 'children' of the referring document. Children are deleted in cascade fashion when the referring document is deleted.

The third, optional argument names a registry field of the referred-to document. Insert, update, and edit database driver functions ensure this registry contains the referring document's id. Usually, the registry would itself be a foreign field with the 'child' boolean true.

NOTE: if the third argument is provided, the field must also be @fixed.

## Interface Consistency
The 'Record', 'Insert', 'Update', and 'Edit' interfaces defined after each Schema class are used for compile-time validation for each database driver function. Maintaining them is an extra step, but a simple one.

### Naming Convention
The interface names should be the name of the represented entity, appended with the respective word ('LearningOutcomeUpdate').

- the 'Record' interface:
  1) extends Record from db.schema.ts
  2) extends the schema's 'Insert' interface
  3) types all @auto decorated fields
- the 'Insert' interface:
  1) extends Insert from db.schema.ts
  2) extends the schema's 'Update' interface
  3) types all @fixed decorated fields
- the 'Update' interface:
  1) extends Update from db.schema.ts
  2) extends the schema's 'Edit' interface
  3) types all @foreign decorated fields
- the 'Edit' interface:
  1) extends Edit from db.schema.ts
  2) types all remaining @field decorated properties