// import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
// import { DataSource } from 'typeorm';
// import { Book } from './entities/books';
// import { Meal } from './entities/meals';

// export const AppDataSource = new DataSource({
//   type: 'sqlite',
//   database: 'database.sqlite',
//   synchronize: true,
//   logging: false,
//   entities: ['src/entities/*.ts'],
//   migrations: ['src/migrations/**/*.ts'],
//   subscribers: ['src/subscribers/**/*.subscriber.ts'],
// });

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization:', err);
//   });

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

  const dropQueryBooks = `
    DROP TABLE IF EXISTS books
  `;

  const insertQueryBooks = `
    CREATE TABLE IF NOT EXISTS books(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type VARCHAR(20),
        name VARCHAR(20),
        price integer,
        author VARCHAR(20)
    )
  `;

  const dummyBooks = `
    insert into books(type,name,price,author) values ('book', 'haha', '25', 'kim')
  `;

  const dropQueryMeals = `
      DROP TABLE IF EXISTS meals
  `;

  const insertQueryMeals = `
      CREATE TABLE IF NOT EXISTS meals(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type VARCHAR(20),
        name VARCHAR(20),
        price integer,
        restaurant VARCHAR(20)
      )
  `;

  const dummyMeals = `
    insert into meals(type,name,price,restaurant) values ('meal', 'kimchi', '26', 'kimchiking')
  `;



  db.serialize(() => {
    db.each(dropQueryBooks);
    db.each(insertQueryBooks);
    db.each(dummyBooks);
    db.each(dropQueryMeals);
    db.each(insertQueryMeals);
    db.each(dummyMeals)
  });


  app.get('/', async (req: Request, res: Response) => {
    const showBooks = `SELECT * FROM books;`;
    const showMeals = `SELECT * FROM meals`;
    db.serialize();
    new Promise((resolve, reject) =>
      db.all(showBooks, (err, rows1) => {
        if (err) console.log(err);
        else {
          db.all(showMeals, (err, rows2) => {{
            if (err) console.log(err);
            return resolve({books: rows1, meal:rows2});
          }})
        }
      }),
    ).then((rows) => res.status(200).send(rows))
  });
  

  app.get('/books', async (req: Request, res: Response) => {
    const booksQuery = `SELECT * FROM books`;
    db.serialize();
    new Promise((resolve, reject) =>
      db.all(booksQuery, (err, rows) => {
        if (err) console.log(err);
        return resolve(rows);
      }),
    ).then((rows) =>
      res.status(200).send({
        books : rows,
      }),
    );
  });

  app.get('/meals', async (req: Request, res: Response) => {
    const mealsQuery = `SELECT * from meals`;
    db.serialize();
    new Promise((resolve, reject) =>
      db.all(mealsQuery, (err, rows) => {
        if (err) console.log(err);
        return resolve(rows);
      }),
    ).then((rows) =>
      res.status(200).send({
        meals : rows,
      }),
    );
  });

app.post('/new', async (req: Request, res: Response): Promise<Response> => {
  const addBook = `insert into books(type, name, price, author) values ('${req.body.type}', '${req.body.name}', '${req.body.price}', '${req.body.author}')`;
  const addMeal = `insert into meals(type, name, price, restaurant) values ('${req.body.type}', '${req.body.name}', '${req.body.price}', '${req.body.restaurant}')`;

  if (req.body.type == "book") {
    db.each(addBook);
  } else if (req.body.type == "meal"){
    db.each(addMeal);
  } else {
    res.send({message: "제대로 된  type 을 넣으세요"})
  }
  return res.status(200).send({
    message: `추가 완료: ${req.body.type}`,
  });
});


// app.get('/', async (req: Request, res: Response) => {
//   const books = await AppDataSource.getRepository(Book).find();
//   const meals = await AppDataSource.getRepository(Meal).find();
//   res.json({
//     books,
//     meals,
//   });
// });

// app.get('/books', async (req: Request, res: Response) => {
//   const books = await AppDataSource.getRepository(Book).find();
//   res.json(books);
// });

// app.get('/meals', async (req: Request, res: Response) => {
//   const meals = await AppDataSource.getRepository(Meal).find();
//   res.json(meals);
// });

// app.post('/new', async (req: Request, res: Response): Promise<Response> => {
//   if (req.body.type === 'book') {
//     const book = await AppDataSource.getRepository(Book).create(req.body);
//     const results = await AppDataSource.getRepository(Book).save(book);
//     return res.send(results);
//   } else {
//     const meal = await AppDataSource.getRepository(Meal).create(req.body);
//     const results = await AppDataSource.getRepository(Meal).save(meal);
//     return res.send(results);
//   }
// });

// app.post('/find', async (req: Request, res: Response): Promise<Response> => {
//   const books = await AppDataSource.getRepository(Book)
//     .createQueryBuilder('book')
//     .where('book.name like :name', { name: `%${req.body.name}%` })
//     .getMany();

//   const meals = await AppDataSource.getRepository(Meal)
//     .createQueryBuilder('meal')
//     .where('meal.name like :name', { name: `%${req.body.name}%` })
//     .getMany();

//   return res.send({ books, meals });
// });


const PORT = 3000;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
