import 'reflect-metadata';
import { DataSource } from 'typeorm';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
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

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/signup', async (req: Request, res: Response) => {
  const user = await AppDataSource.getRepository(User).create(req.body);
  AppDataSource.getRepository(User).save(user);
  return res.send({ '회원가입 완료': `${req.body.username}` });
});

app.post('/login', async (req: Request, res: Response) => {
  const user = await AppDataSource.getRepository(User)
    .createQueryBuilder('user')
    .where('user.username = :username')
    .setParameter('username', `${req.body.username}`)
    .getOne();
  if (user === null) {
    return res.send('없는 계정');
  } else {
    return res.send(req.body.password === user.password ? '로그인 성공!' : '비밀번호가 틀립니다.');
  }
});
const PORT = 3000;

try {
  app.listen(PORT, (): void => {
    console.log(`Connected successfully on port ${PORT}`);
  });
} catch (error: any) {
  console.error(`Error ouccred: ${error.message}`);
}
