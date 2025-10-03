import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// --- PROTOCOLOS DE COMUNICAÇÃO (MIDDLEWARES) ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- LINHAS DE COMANDO (ROTAS) ---
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/tarefas', routes.tarefa); // Verifique se você tem esta rota

// --- SEQUÊNCIA DE IGNIÇÃO E SINCRONIZAÇÃO ---
const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  // Apenas inicia o servidor DEPOIS que o banco de dados estiver pronto.
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`SOLDADO PRONTO. Ouvindo ordens na porta ${port}. A guerra começou.`);
  });
});

// A Vercel usará este export, e geralmente ignora o app.listen.
export default app;