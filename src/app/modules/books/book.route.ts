import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();
router.post('/add-book', BookController.AddBook);
router.get('/allbooks', BookController.getAllBooks);
router.get('/:id', BookController.getSingleBook);
router.delete('/:id', BookController.deleteBook);
router.patch('/:id', BookController.updateBook);
router.get('/', BookController.getAllBooks);
export const BookRoutes = router;
