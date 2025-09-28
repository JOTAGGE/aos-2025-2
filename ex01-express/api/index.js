import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';

// 1. Cria a base de operações
const app = express();

// 2. Define os protocolos de comunicação (Middlewares)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Conecta as rotas de combate (Endpoints)
// Nós não precisamos do lixo legado. Apenas nossas rotas de CRUD.
app.use('/users', routes.user);
app.use('/messages', routes.message);

// 4. Protocolo de Sincronização com o Banco de Dados
// Esta seção garante que nossas tabelas existam antes de qualquer combate.
const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  // A Vercel não usa app.listen. Nós apenas logamos que a base está pronta.
  console.log('Sincronização com o depósito de munição (DB) concluída com sucesso.');
});

// 5. Exporta a base para que a Vercel possa comandá-la.
export default app;