import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3, { LIMIT_COLUMN } from 'sqlite3';

const app: Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new sqlite3.Database('./db/my.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the mydb database.');
  }
});

const dropQuery = `
  DROP TABLE IF EXISTS books
`;
const dropQuery1 = `
  DROP TABLE IF EXISTS meals
`;

const insertQuery = `
  CREATE TABLE IF NOT EXISTS books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(20),
    name VARCHAR(20),
    price INTEGER,
    author VARCHAR(20)
  )
`;

const insertQuery1 = `
  CREATE TABLE IF NOT EXISTS meals(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(20),
    name VARCHAR(20),
    price INTEGER,
    restaurant VARCHAR(20)
  )
`;

const dummyDataQuery = `
  insert into books(type, name, price, author) values ('book', 'nolboo', 10000, 'junhyun'), ('book', 'heungboo', 15000, 'lalala')
`;

const dummyDataQuery1 = `
  insert into meals(type, name, price, restaurant) values ('meal', 'eggfried', 1000, 'urijip'), ('meal', 'hamburger', 40000, 'kingdonald')
`;

db.serialize(() => {
  db.each(dropQuery);
  db.each(dropQuery1);
  db.each(insertQuery);
  db.each(insertQuery1);
  db.each(dummyDataQuery);
  db.each(dummyDataQuery1);
});

app.get('/', async (req: Request, res: Response) => {
  const query = `SELECT * FROM books`;
  const query1 = `SELECT * FROM meals`;
  db.serialize();
  new Promise((resolve, reject) =>
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    }),
  ).then((rows) =>
    res.status(200).send({
      books: rows,
      meals: rows
    }),
  ); // book, meals 전체 목록 보여주기
});

app.get('/books', async (req: Request, res: Response) => {
  const query = `SELECT name FROM books`;
  db.serialize();
  new Promise((resolve, reject) =>
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    }),
  ).then((rows) =>
    res.status(200).send({
      books : rows,
    }),
  );
}); // /books 로 접근하면 book 이름 목록 보여주기

app.get('/meals', async (req: Request, res: Response) => {
  const query = `SELECT name FROM meals`;
  db.serialize();
  new Promise((resolve, reject) =>
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    }),
  ).then((rows) =>
    res.status(200).send({
      meals : rows,
    }),
  );
}); // /meals 로 접근하면 meal 이름 목록 보여주기

app.post('/', async (req: Request, res: Response): Promise<Response> => {
  const query = `insert into books(type, name, price) values ('${req.body.name}')`;
  db.serialize();
  db.each(query);
  return res.status(200).send({
    message: `Hello World! ${req.body.name}`,
  });
});


const PORT = 3000;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}