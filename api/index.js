import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', routes.user);
app.use('/messages', routes.message);

sequelize.sync().then(() => console.log("DB sincronizado."));

export const handler = serverless(app);
