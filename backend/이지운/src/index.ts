import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";

const app: Application = express();

const books_db = new sqlite3.Database(
  "./db/books.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the booksdb database.");
    }
  }
);

const meals_db = new sqlite3.Database(
  "./db/meals.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the mealsdb database.");
    }
  }
);

const booksDropQuery = `
  DROP TABLE IF EXISTS books
`;
const booksInsertQuery = `
  CREATE TABLE IF NOT EXISTS books(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(20),
    name VARCHAR(20),
    price INTEGER(10),
    author VARCHAR(20)
  )
`;
const mealsDropQuery = `
  DROP TABLE IF EXISTS meals
`;
const mealsInsertQuery = `
  CREATE TABLE IF NOT EXISTS meals(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type VARCHAR(20),
    name VARCHAR(20),
    price INTEGER(10),
    restaurant VARCHAR(20)
  )
`;

books_db.serialize(() => {
  books_db.each(booksDropQuery);
  books_db.each(booksInsertQuery);
});

meals_db.serialize(() => {
  meals_db.each(mealsDropQuery);
  meals_db.each(mealsInsertQuery);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req: Request, res: Response) => {
  const booksQuery = `SELECT * FROM books`;
  books_db.serialize();
  const r = [] as any[];
  await new Promise((resolve) =>
    books_db.all(booksQuery, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    })
  ).then((rows) => r.push({ books: rows }));

  const mealsQuery = `SELECT * FROM meals`;
  meals_db.serialize();
  await new Promise((resolve) =>
    meals_db.all(mealsQuery, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    })
  ).then((rows) => r.push({ meals: rows }));

  res.status(200).send({
    result: r,
  });
});

app.get("/books", async (req: Request, res: Response) => {
  const query = `SELECT * FROM books`;
  books_db.serialize();
  new Promise((resolve) =>
    books_db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    })
  ).then((rows) =>
    res.status(200).send({
      books: rows,
    })
  );
});

app.get("/meals", async (req: Request, res: Response) => {
  const query = `SELECT * FROM meals`;
  meals_db.serialize();
  new Promise((resolve) =>
    meals_db.all(query, (err, rows) => {
      if (err) console.log(err);
      return resolve(rows);
    })
  ).then((rows) =>
    res.status(200).send({
      meals: rows,
    })
  );
});

app.post("/new", async (req: Request, res: Response): Promise<Response> => {
  const booksQuery = `INSERT INTO books(type, name, price, author) VALUES ('${req.body.type}', '${req.body.name}', '${req.body.price}', '${req.body.author}')`;
  const mealsQuery = `INSERT INTO meals(type, name, price, restaurant) VALUES ('${req.body.type}', '${req.body.name}', '${req.body.price}', '${req.body.restaurant}')`;
  if (req.body.type == "book") {
    books_db.serialize();
    books_db.each(booksQuery);
  } else if (req.body.type == "meal") {
    meals_db.serialize();
    meals_db.each(mealsQuery);
  }
  return res.status(200).send();
});

const PORT = 3000;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
