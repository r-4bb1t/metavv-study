import express, {Application, Request, Response} from 'express'
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from 'sqlite3';

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

const dropQuery = `DROP TABLE IF EXISTS BookTable`;
const dropQuery2 = `DROP TABLE IF EXISTS MealTable`;

const insertQuery = `
    CREATE TABLE IF NOT EXISTS BookTable(
        type TEXT,
        name VARCHAR(20),
        price INTEGER,
        author VARCHAR(20)
    )
`;

const insertQuery2 = `
    CREATE TABLE IF NOT EXISTS MealTable(
        type TEXT,
        name VARCHAR(20),
        price INTEGER,
        restaurant VARCHAR(20)
    )
`;


db.serialize(() => {
    db.each(dropQuery);
    db.each(dropQuery2);
    db.each(insertQuery);
    db.each(insertQuery2);
});


app.get('/', async(req: Request, res: Response) => {
    const query = `SELECT * FROM BookTable UNION SELECT * FROM MealTable`;
    new Promise((resolve, reject) =>
        db.all(query, (err, rows) => {
            if (err) console.log(err);
            return resolve(rows);
        }),
    ).then((rows) =>
        res.status(200).send({
            data: rows,
        }),
    );
});

app.get('/books', async(req: Request, res: Response) => {
    const query_book = `SELECT * FROM BookTable`;
    new Promise((resolve, reject) =>
        db.all(query_book, (err, rows) => {
            if (err) console.log(err);
            return resolve(rows);
        }),
    ).then((rows) =>
        res.status(200).send({
            books: rows,
        }),
    );
});

app.get('/meals', async(req: Request, res: Response) => {
    const query_food = `SELECT * FROM MealTable`;
    new Promise((resolve, reject) =>
        db.all(query_food, (err, rows) => {
            if (err) console.log(err);
            return resolve(rows);
        }),
    ).then((rows) =>
        res.status(200).send({
            meals: rows,
        }),
    );
});

app.post("/new", async (req: Request, res: Response) => {
    let query;
    if (req.body.type === 'book') {
        query = `insert into BookTable(type, name, price, author) values ("${req.body.type}", "${req.body.name}", "${req.body.price}", "${req.body.author}")`;
    } else if (req.body.type === 'meal') {
        query = `insert into MealTable(type, name, price, restaurant) values ("${req.body.type}", "${req.body.name}", "${req.body.price}", "${req.body.restaurant}")`;
    } else {
        query = '';
    }
    db.serialize();
    db.each(query);
    return res.status(200).send({
        message: `added ${req.body.name}`,
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