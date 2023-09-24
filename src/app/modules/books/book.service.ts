import httpStatus from 'http-status';
import {
  BookSearchableFields,
  IBook,
  IBookFilters,
  IBookSearch,
} from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';

const AddBook = async (book: IBook): Promise<IBook | null> => {
  const AddBook = await Book.create(book);

  if (!AddBook) {
    throw new ApiError(false, 'Failed to create User');
  }
  return AddBook;
};
const AddReview = async (
  id: string,
  reviews: string[],
): Promise<IBook | null> => {
  try {
    const book = await Book.findById(id);
    console.log(book);
    if (!book) {
      throw new Error('Book Not Found');
    }
    book.reviews?.push(...reviews);
    await book.save();
    return book;
  } catch (error) {
    throw new Error('Failed to add reviews to the book');
  }
};

const getAllBooks = async (search: IBookSearch, filters: IBookFilters) => {
  // const result = await Book.find({});

  const { ...filtersData } = filters;
  const { ...searchTerm } = search;

  const andConditions = [];

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (Object.keys(searchTerm).length > 0) {
    andConditions.push({
      $or: BookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm.author || searchTerm.genre || searchTerm.title,
          $options: 'i',
        },
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions);

  return {
    data: result,
  };
};
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  return result;
};

const updateBook = async (
  _id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: _id }, payload, {
    new: true,
  });
  return result;
};

const deleteBookById = async (_id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(_id);
  return result;
};

export const BookService = {
  AddBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBookById,
  AddReview,
};
