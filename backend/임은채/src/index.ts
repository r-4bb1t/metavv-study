import 'reflect-metadata';
import express, {Application, Request, Response} from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import sqlite3 from 'sqlite3';
import { DataSource } from 'typeorm';
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

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

const app: Application = express()

app.post("/signup", async(req: Request, res:Response): Promise<Response> => {
    const user = await AppDataSource.getRepository(User).create(req.body);
    const results = await AppDataSource.getRepository(User).save(user);
    return res.send(results);
});

app.post('/login', async(req: Request, res: Response): Promise<Response> => {
    const users = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .where('user.username like :username', { username: `%${req.body.username}%` })
        .getMany();

    const results = await AppDataSource.getRepository(User)
        .createQueryBuilder('result')
        .where('result.username like :username', { username: `%${req.body.username}%`})
        .andWhere('result.password like :password', { password: `%${req.body.password}%`})
        .getMany();

    if (users.length == 0) {
        return res.send({ message: "없는 계정" });
    } else if (results.length == 0) {
        return res.send({ message: "비밀번호 틀림" });
    } else {
        return res.send({ message: "로그인 성공" });
    }

});

const PORT = 3000;

try {
    app.listen(PORT, (): void => {
        console.log(`Connected successfully on port ${PORT}`);
    });
} catch (error: any) {
    console.error(`Error occured: ${error.message}`);
}