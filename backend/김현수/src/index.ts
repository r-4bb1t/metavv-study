import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { DataSource } from 'typeorm';
import { Book } from './entities/book';
import { Meal } from './entities/meal';
import { User } from './entities/user';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.subscriber.ts'],
});

const app: Application = express();
const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {
  const meals = await AppDataSource.getRepository(Meal).find();
  const books = await AppDataSource.getRepository(Book).find();
  
  res.json({
    meals : meals,
    books : books,
  })
});

app.get('/books',async (req:Request, res:Response) => {
  const books = await AppDataSource.getRepository(Book).find();
  res.json(books);
})

app.get('/meals',async (req:Request, res:Response) => {
  const meals = await AppDataSource.getRepository(Meal).find();
  res.json(meals);
})

app.post('/signup', async (req : Request, res : Response) => {
  const user = await AppDataSource.getRepository(User).create(req.body);
  const results = await AppDataSource.getRepository(User).save(user);
  return res.send(results);
})

app.post('/login', async (req : Request, res : Response) => {
  const user = await AppDataSource.getRepository(User)
  .createQueryBuilder("user")
  .where("user.username = :username", {username : req.body.username})
  .getOne()

  if (!user) return res.send("없는 계정");
  else if (user.password == req.body.password) return res.send("로그인 성공");
  else return res.send("로그인 실패");
})


app.post('/new', async (req : Request, res : Response) => {
  if (req.body.type === 'book') {
    const book = await AppDataSource.getRepository(Book).create(req.body);
    const results = await AppDataSource.getRepository(Book).save(book);
    return res.send(results);
  } else if (req.body.type === 'meal') {
    const meal = await AppDataSource.getRepository(Meal).create(req.body);
    const results = await AppDataSource.getRepository(Meal).save(meal);
    return res.send(results);  
  }
})

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

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}