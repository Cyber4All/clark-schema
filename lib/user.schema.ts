/**
 * Define the database schema for Bloomin' Onion users.
 */

export type UserDocument = {
  _id?: string;
  username: string;
  name: string;
  email: string;
  organization: string;
  password: string;
  objects: string[];
};
