import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';

const app: Application = express();
const PORT = 3000;

const db = new sqlite3.Database('./db/my.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the mydb database.');
  }
});

const dropQuery = `
  DROP TABLE IF EXISTS person
`;

const insertQuery = `
  CREATE TABLE IF NOT EXISTS person(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(20)
  )
`;

const insertBookQuery = `
  CREATE TABLE IF NOT EXISTS book(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(20),
    name VARCHAR(20),
    price INTEGER,
    author VARCHAR(20)
  )
`;

const insertMealQuery = `
  CREATE TABLE IF NOT EXISTS meal(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(20),
    name VARCHAR(20),
    price INTEGER,
    restaurant VARCHAR(20)
  )
`;

const dummyDataQuery = `
  insert into person(name) values ('hi'), ('hello')
`;

db.serialize(() => {
  db.each(dropQuery);
  db.each(insertQuery);
  db.each(dummyDataQuery);
  db.each(insertBookQuery);
  db.each(insertMealQuery);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req: Request, res: Response) => {
  const query = `SELECT * FROM meal`;
  const query2 = `SELECT * FROM book`;
  const arr = [] as any[];

  db.serialize();

  new Promise((resolve, reject) =>
    db.all(query, (err, rows) => { 
      if (err) console.log(err);
      else {
        db.all(query2, (err, rows2) => {
          if (err) console.log(err);
          console.log({1 : rows});
          console.log({2 : rows2});
          arr.push({meals : rows, books : rows2});
          return resolve(arr); 
        })
      }
    }),
  ).then(() => {
    res.status(200).send(arr)
  }
  );
});

app.get('/', async (req: Request, res: Response) => {
  const query = `SELECT * FROM person`;
  db.serialize();
  new Promise((resolve, reject) =>
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    }),
  ).then((rows) =>
    res.status(200).send({
      user: rows,
    }),
  );
});

app.post('/', async (req: Request, res: Response): Promise<Response> => {
  const query = `insert into person(name) values ('${req.body.name}')`;
  db.serialize();
  db.each(query);
  return res.status(200).send({
    message: `입력 완료: ${req.body.name}`,
  });
});

app.get('/books', async (req: Request, res: Response) => {
  const query = `SELECT * FROM book`;

  new Promise((resolve, reject) =>
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    }),
  ).then((rows) =>
    res.status(200).send({
      user: rows,
    }),
  );
});

app.get('/meals', async (req: Request, res: Response) => {
  const query = `SELECT * FROM meal`;

  new Promise((resolve, reject) =>
    db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    }),
  ).then((rows) =>
    res.status(200).send({
      user: rows,
    }),
  );
});

app.post('/new', async (req: Request, res: Response): Promise<Response> => {
  const queryMeal = `insert into meal(type, name, price, restaurant) values ('${req.body.type}', '${req.body.name}', '${req.body.price}', '${req.body.restaurant}')`;
  const queryBook = `insert into book(type, name, price, author) values ('${req.body.type}', '${req.body.name}', '${req.body.price}', '${req.body.author}')`;

  if (req.body.type == "meal") {
    db.each(queryMeal);
  } else if (req.body.type == "book"){
    db.each(queryBook);
  }

  return res.status(200).send({
    message: `입력 완료: ${req.body.type}`,
  });
});

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}

//   {
//     "type" : "meal",
//     "name" : "밥",
//     "price" : 30000,
//     "restaurant" : "식당"
// }

// {
//   "type" : "book",
//   "name" : "책",
//   "price" : 30000,
//   "author" : "이요환"
// }
