// api/index.js
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import serverless from 'serverless-http'; // npm i serverless-http

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', routes.user);
app.use('/messages', routes.message);

const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  console.log('DB sync done.');
});

// exporta o handler serverless — isso é o que a Vercel espera
export default serverless(app);
