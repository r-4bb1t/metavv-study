import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { DataSource } from 'typeorm';
import { Book } from './entities/book';
import { Meal } from './entities/meal';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: ['src/entities/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.subscriber.ts'],
});

const PORT = 3000;
const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}

//db 생성
const db = new sqlite3.Database('./db/my.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the mydb database.');
  }
});

const dropQuerybooks = `
  DROP TABLE IF EXISTS books
`;
const dropQuerymeals = `
  DROP TABLE IF EXISTS meals
`;

const insertQuerybooks = `
  CREATE TABLE IF NOT EXISTS books(
    type VARCHAR(20),
    name VARCHAR(20),
    price INTEGER,
    author VARCHAR(20)
  )
`;

const insertQuerymeals = `
  CREATE TABLE IF NOT EXISTS meals(
    type VARCHAR(20),
    name VARCHAR(20), 
    price INTEGER,
    restaurant VARCHAR(20)
  )
`;

db.serialize(() => {
  db.each(dropQuerybooks);
  db.each(dropQuerymeals);
  db.each(insertQuerybooks);
  db.each(insertQuerymeals);
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


/*
// /new 기능
app.post('/new', async (req: Request, res: Response): Promise<Response> => {
  if (req.body.type == "book") {
    const query = `insert into books(type, name, price, author) values ('${req.body.type}','${req.body.name}',${req.body.price},'${req.body.author}')`;
    db.serialize();
    db.each(query);
    return res.status(200).send({
      message: `books에 입력 완료`,
    });
  }
  else if (req.body.type == "meal") {
    const query = `insert into meals(type, name, price, restaurant) values ('${req.body.type}','${req.body.name}',${req.body.price},'${req.body.restaurant}')`;
    db.serialize();
    db.each(query);
    return res.status(200).send({
      message: `meals에 입력 완료`,
    });
  }
});

// /books에 get 메소드로 접근했을 때 책 목록 나열
app.get('/books', async (req: Request, res: Response) => {
  const query = `SELECT * FROM books`;
  db.serialize();
  new Promise((resolve, reject) =>
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    }),
  ).then((rows) =>
    res.status(200).send({
      books: rows,
    }),
  );
});

// /meals에 get 메소드로 접근했을 때 음식 목록 나열
app.get('/meals', async (req: Request, res: Response) => {
  const query = `SELECT * FROM meals`;
  db.serialize();
  new Promise((resolve, reject) =>
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    }),
  ).then((rows) =>
    res.status(200).send({
      meals: rows,
    }),
  );
});

// /에 get 메소드로 접근했을 때 모든 data 출력
app.get('/', async (req: Request, res: Response) => {
  const querybooks = `SELECT * FROM books`;
  const querymeals = `SELECT * FROM meals`;
  db.serialize();
  new Promise((resolve, reject) =>
    db.all(querybooks, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    }),
  ).then((rows) =>
    res.status(200).send({
      books: rows,
    }),
  );
  new Promise((resolve, reject) =>
    db.all(querymeals, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    }),
  ).then((rows) =>
    res.status(200).send({
      meals: rows,
    }),
  );
});
*/