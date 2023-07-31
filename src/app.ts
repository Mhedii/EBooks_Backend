import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);
// Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Connction Successful');
});
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  Promise.reject(new Error('Unhandled Promise Rejection'));
});

//Global Error Handling
// app.use(globalErrorHandler);



// Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'NOT FOUND',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API NOT FOUND',
      },
    ],
  });
  next();
});
export default app;
