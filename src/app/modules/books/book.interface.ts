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

export type IBookFilters = {
  // searchTerm?: string;
  genre?: string;
  publicationYear?: number;
};
export type IBookSearch = {
  searchTerm?: string;
  title?: string;
  author?: string;
  genre?: string;
};

export const BookSearchableFields = ['searchTerm', 'title', 'author', 'genre'];
export const BookFilterableFields = ['searchTerm', 'genre', 'publicationYear'];
