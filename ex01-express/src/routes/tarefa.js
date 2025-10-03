// /src/routes/tarefa.js
import { Router } from 'express';
import models from '../models';

const router = Router();

// ROTA: Recrutar uma nova Tarefa (POST)
router.post('/', async (req, res) => {
  try {
    const { descricao, concluida } = req.body;
    // A validação de 'descricao' já está no modelo, o Sequelize vai tratar disso.
    const novaTarefa = await models.Tarefa.create({
      descricao,
      concluida,
    });
    return res.status(201).json(novaTarefa);
  } catch (error) {
    // Captura erros, incluindo falhas de validação do modelo.
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Listar todas as Tarefas (GET)
router.get('/', async (req, res) => {
  try {
    const tarefas = await models.Tarefa.findAll();
    return res.status(200).json(tarefas);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Obter uma Tarefa específica pelo ID (GET)
router.get('/:tarefaId', async (req, res) => {
  try {
    const tarefa = await models.Tarefa.findByPk(req.params.tarefaId);
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    return res.status(200).json(tarefa);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Atualizar uma Tarefa (PUT)
router.put('/:tarefaId', async (req, res) => {
  try {
    const tarefa = await models.Tarefa.findByPk(req.params.tarefaId);
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    const { descricao, concluida } = req.body;
    const tarefaAtualizada = await tarefa.update({ descricao, concluida });
    return res.status(200).json(tarefaAtualizada);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

// ROTA: Eliminar uma Tarefa (DELETE)
router.delete('/:tarefaId', async (req, res) => {
  try {
    const result = await models.Tarefa.destroy({
      where: { id: req.params.tarefaId },
    });
    if (result === 0) {
      return res.status(404).send('Tarefa não encontrada.');
    }
    return res.status(204).send(); // Sucesso, sem conteúdo.
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
});

export default router;