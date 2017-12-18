import { Mongo } from 'meteor/mongo';

export const Matches = new Mongo.Collection("matches");
export const Queue = new Mongo.Collection('queue');