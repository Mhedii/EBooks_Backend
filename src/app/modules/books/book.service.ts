import httpStatus from 'http-status';
import { IBook } from './book.interface';
import { Book } from './book.model';

const AddBook = async (book: IBook): Promise<IBook | null> => {
  const AddBook = await Book.create(book);

  if (!AddBook) {
    // throw new ApiError(false, 'Failed to create User');
    console.log('object');
  }
  return AddBook;
};

const getAllBooks = async () => {
  const result = await Book.find({});

  return {
    data: result,
  };
};
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};
export const BookService = {
  AddBook,
  getAllBooks,
  getSingleBook,
};
