import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = new sqlite3.Database('./db/my.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to the mydb database');
});

const dropBook = `DROP TABLE IF EXISTS book`;
const dropMeal = `DROP TABLE IF EXISTS meal`;

const createBook = `CREATE TABLE IF NOT EXISTS book(
  id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), price integer, author varchar(20)
  )`;
const createMeal = `CREATE TABLE IF NOT EXISTS meal(
  id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), price integer, restaurant varchar(20)
  )`;

const dummyBook = `insert into book(name, price, author) values ('bookex', 3000, 'authorex')`;
const dummyMeal = `insert into meal(name, price, restaurant) values('mealex', 4500, 'restaurantex')`;

// query execution in db
db.serialize(() => {
  //db.serialize guarantees synchronization
  db.each(dropBook);
  db.each(dropMeal);
  db.each(createBook);
  db.each(createMeal);
  db.each(dummyBook);
  db.each(dummyMeal);
  // db.each(dummyDataQuery);
});

app.get('/', async (req: Request, res: Response) => {
  const selectBook = `select * from book`;
  const selectMeal = `select * from meal`;
  // db.serialize();
  new Promise((resolve, reject) =>
    db.all(selectBook, (err, rows1) => {
      if (err) console.log(err);
      else {
        db.all(selectMeal, (err, rows2) => {
          if (err) console.log(err);
          return resolve({ book: rows1, meal: rows2 });
        });
      }
    }),
  ).then((info) => res.status(200).send(info));
});

app.get('/books', async (req: Request, res: Response) => {
  const query = `select * from book`;
  new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    });
  }).then((rows) => {
    res.status(200).send({
      book: rows,
    });
  });
});

app.get('/meals', async (req: Request, res: Response) => {
  const query = `select * from meal`;
  new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    });
  }).then((rows) => {
    res.status(200).send({
      book: rows,
    });
  });
});

app.post('/', async (req: Request, res: Response): Promise<Response> => {
  let query;
  if (req.body.type === 'book') {
    query = `insert into book(name, price, author) values ('${req.body.name}', ${req.body.price}, '${req.body.author}')`;
  } else if (req.body.type === 'meal') {
    query = `insert into meal(name, price, restaurant) values ('${req.body.name}', ${req.body.price}, '${req.body.restaurant}')`;
  } else {
    query = '';
  }
  db.serialize();
  db.each(query);
  return res.status(200).send({
    message: `${req.body.type} is added`,
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
