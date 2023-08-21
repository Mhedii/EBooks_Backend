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

const getAllBooks = async (search: IBookSearch, filters: IBookFilters) => {
  // const result = await Book.find({});

  const { ...filtersData } = filters;
  const { ...searchTerm } = search;

  const andConditions = [];

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  if (Object.keys(searchTerm).length) {
    andConditions.push({
      $and: Object.entries(searchTerm).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // if (searchTerms) {
  //   andConditions.push({
  //     $or: BookSearchableFields.map(field => ({
  //       [field]: {
  //         $regex: searchTerms,
  //         $options: 'i',
  //       },
  //     })),
  //   });
  // }

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
export const BookService = {
  AddBook,
  getAllBooks,
  getSingleBook,
};
