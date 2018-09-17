/**
 * Define the database schema for learning objects.
 */
export type LearningObjectDocument = {
  _id?: string;
  authorID: string;
  name: string;
  date: string;
  length: string;
  levels: string[];
  goals: LearningGoalDocument[];
  outcomes: string[];
  materials: MaterialDocument;
  published: boolean;
  contributors: string[];
  children: string[];
  lock?: LearningObjectLockDocument;
};

export type LearningGoalDocument = {
  text: string;
};

export type MaterialDocument = {
  files: FileDocument[];
  urls: UrlDocument[];
  notes: string;
};

export type FileDocument = {
  id: string;
  name: string;
  fileType: string;
  url: string;
  date: string;
};

export enum Restriction {
  FULL = 'full',
  PUBLISH = 'publish',
  DOWNLOAD = 'download'
}
export type LearningObjectLockDocument = {
  date?: string;
  restrictions: Restriction[];
};

export type UrlDocument = { title: string; url: string };
