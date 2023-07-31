import { Model } from 'mongoose';

export type IBook = {
    id?:number,
  title: string;
  author: string;
  genre: string;
  publicaitonYear: number;
  publicaitonDate: string;
  reviews: number;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
