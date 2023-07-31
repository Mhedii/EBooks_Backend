import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponses';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';

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

export const BookController = {
  AddBook
};
