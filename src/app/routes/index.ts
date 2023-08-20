import express from 'express';
import { BookRoutes } from '../modules/books/book.route';
import { UserRoutes } from '../modules/users/user.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/',
    route: UserRoutes,
  },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

// router.use('/', );

export default router;
