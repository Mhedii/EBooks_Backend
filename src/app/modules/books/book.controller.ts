import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponses';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import {
  BookFilterableFields,
  BookSearchableFields,
  IBook,
} from './book.interface';
import pick from '../../../shared/pick';

const AddBook = catchAsync(async (req: Request, res: Response) => {
  const book = req.body;
  const result = await BookService.AddBook(book);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'New Book Added successfully',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  // const result = await BookService.getAllBooks();

  const filters = pick(req.query, BookFilterableFields);
  const searchTerm = pick(req.query, BookSearchableFields);
  const result = await BookService.getAllBooks(searchTerm, filters);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Books retrieved successfully',
    data: result.data,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Book',
    data: result,
  });
});

const updateBook = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await BookService.updateBook(id, updatedData);

    sendResponse<IBook>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book updated successfully',
      data: result,
    });
  }),
);

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deleteBookById(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  AddBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
