import express from 'express';
import errorMiddleware from '@/errors/errorMiddleware';
import setupRoutes from './setupRoutes';

const app = express();

app.use(express.json());
setupRoutes(app);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));