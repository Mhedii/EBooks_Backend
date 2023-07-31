import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();
router.post(
  '/add-book',
  BookController.AddBook,
);

export const BookRoutes = router;
