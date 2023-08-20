import { Model } from 'mongoose';

export type IBook = {
  id?: number;
  // file?: File;
  title?: string;
  author?: string;
  anotherAuthor?: string;
  genre?: string;
  publicaitonYear?: number;
  publicaitonDate?: string;
  reviews?: number;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
