import {
    RecordID,
    Record,
    Insert,
    Update,
    Edit,
    auto,
    autosFor,
    field,
    fixed,
    fixedsFor,
    foreign,
    foreignsFor,
    fieldsFor,
    collections,
    collectionFor,
    schemaFor,
    textsFor,
    text,
    uniquesFor,
    unique,
    foreignData
} from './db.schema';

import { UserID, UserSchema, UserRecord, UserInsert, UserUpdate, UserEdit } from './user.schema';
import {
    LearningObjectID, LearningObjectSchema, LearningObjectRecord,
    LearningObjectInsert, LearningObjectUpdate, LearningObjectEdit, LearningGoalInterface,
} from './learning-object.schema';
import {
    LearningOutcomeID, LearningOutcomeSchema, LearningOutcomeRecord,
    LearningOutcomeInsert, LearningOutcomeUpdate, LearningOutcomeEdit,
} from './learning-outcome.schema';
import {
    StandardOutcomeID, StandardOutcomeSchema, StandardOutcomeRecord,
    StandardOutcomeInsert, StandardOutcomeUpdate, StandardOutcomeEdit,
} from './standard-outcome.schema';
import { OutcomeID, OutcomeRecord, AssessmentPlanInterface, InstructionalStrategyInterface } from './outcome.schema';

export {
    auto,
    autosFor,
    field,
    fixed,
    fixedsFor,
    foreign,
    foreignsFor,
    fieldsFor,
    collections,
    collectionFor,
    schemaFor,
    textsFor,
    text,
    uniquesFor,
    unique,
    foreignData,
    UserID, UserSchema, UserRecord, UserInsert, UserUpdate, UserEdit,
    LearningObjectID, LearningObjectSchema, LearningObjectRecord, LearningObjectInsert, LearningObjectUpdate, LearningObjectEdit,
    LearningOutcomeID, LearningOutcomeSchema, LearningOutcomeRecord, LearningOutcomeInsert, LearningOutcomeUpdate, LearningOutcomeEdit,
    StandardOutcomeID, StandardOutcomeSchema, StandardOutcomeRecord, StandardOutcomeInsert, StandardOutcomeUpdate, StandardOutcomeEdit,
    RecordID, Record, Insert, Update, Edit,
    OutcomeID, OutcomeRecord, AssessmentPlanInterface, InstructionalStrategyInterface, LearningGoalInterface
}