import httpStatus from 'http-status';
import { IBook } from './book.interface';
import { Book } from './book.model';


const AddBook = async (book: IBook): Promise<IBook | null> => {

  const AddBook = await Book.create(book);

  if (!AddBook) {
    // throw new ApiError(false, 'Failed to create User');
    console.log("object");
  }
  return AddBook;
};


export const BookService = {
  AddBook
};
