import { Meal } from './entities/meal';
import { Book } from './entities/book'; 
import { DataSource } from 'typeorm';
import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT = 3000;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.subscriber.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

app.get('/', async (req: Request, res: Response) => {
  const books = await AppDataSource.getRepository(Book).find();
  const meals = await AppDataSource.getRepository(Meal).find();
  res.json({
    books,
    meals,
  });
});

app.get('/books', async (req: Request, res: Response) => {
  const books = await AppDataSource.getRepository(Book).find();
  res.json(books);
});

app.get('/meals', async (req: Request, res: Response) => {
  const meals = await AppDataSource.getRepository(Meal).find();
  res.json(meals);
});

app.post('/new', async (req: Request, res: Response): Promise<Response> => {
  if (req.body.type === 'book') {
    const book = await AppDataSource.getRepository(Book).create(req.body);
    const results = await AppDataSource.getRepository(Book).save(book);
    return res.send(results);
  } else {
    const meal = await AppDataSource.getRepository(Meal).create(req.body);
    const results = await AppDataSource.getRepository(Meal).save(meal);
    return res.send(results);
  }
});

app.post('/find', async (req: Request, res: Response): Promise<Response> => {
  const books = await AppDataSource.getRepository(Book)
    .createQueryBuilder('book')
    .where('book.name like :name', { name: `%${req.body.name}%` })
    .getMany();

  const meals = await AppDataSource.getRepository(Meal)
    .createQueryBuilder('meal')
    .where('meal.name like :name', { name: `%${req.body.name}%` })
    .getMany();

  return res.send({ books, meals });
});