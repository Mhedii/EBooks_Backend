import { Schema, model } from 'mongoose';
import { BookModel, IBook } from './book.interface';

export const bookSchema = new Schema<IBook>(
  {
    id: {
      type: Number,
    },
    // file: {
    //   type: File,
    // },
    title: {
      type: String,
      // required: true,
    },
    author: {
      type: String,
      // required: true,
    },
    anotherAuthor: {
      type: String,
      // required: true,
    },
    genre: {
      type: String,
      // required: true,
    },
    publicaitonYear: {
      type: Number,
      // required: true,
    },
    publicaitonDate: {
      type: String,
      // required: true,
    },
    // reviews: {
    //   type: Number,
    //   // required: true,
    // },
    reviews: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);
bookSchema.pre('save', async function (next) {
  const isExist = await Book.findOne({
    id: this.id,
  });

  if (isExist) {
    // throw new ApiError(false, 'Phone Number is Already exist');
    console.log(isExist);
  }
  next();
});
export const Book = model<IBook, BookModel>('Book', bookSchema);
