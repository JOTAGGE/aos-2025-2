import { Router } from 'express';
import models from '../models';

const router = Router();

// ROTA: Listar todos os soldados (GET)
router.get('/', async (req, res) => {
  try {
    const users = await models.User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
  }
});

// ROTA: Obter um soldado específico pelo ID (GET)
router.get('/:userId', async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
  }
});

// ROTA: Recrutar um novo soldado (POST)
// Nota: O arquivo original criava usuários com senhas. Simplificamos para o CRUD.
router.post('/', async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).send('Nome de usuário e email são obrigatórios.');
    }
    const newUser = await models.User.create({
      username,
      email,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
  }
});

// ROTA: Atualizar um soldado (PUT)
router.put('/:userId', async (req, res) => {
  try {
    const user = await models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }
    const { username, email } = req.body;
    const updatedUser = await user.update({ username, email });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
  }
});

// ROTA: Eliminar um soldado (DELETE)
router.delete('/:userId', async (req, res) => {
  try {
    const result = await models.User.destroy({
      where: { id: req.params.userId },
    });
    if (result === 0) {
      return res.status(404).send('Usuário não encontrado.');
    }
    return res.status(204).send(); // Sucesso, sem conteúdo.
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
  }
});

export default router;