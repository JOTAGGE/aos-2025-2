import { Router } from 'express';
import models from '../models';

const router = Router();

// ROTA: Listar todas as mensagens (GET)
router.get('/', async (req, res) => {
  try {
    const messages = await models.Message.findAll();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
  }
});

// ROTA: Obter uma mensagem específica pelo ID (GET)
router.get('/:messageId', async (req, res) => {
  try {
    const message = await models.Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).send('Mensagem não encontrada.');
    }
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
  }
});

// ROTA: Enviar uma nova mensagem (POST)
router.post('/', async (req, res) => {
  try {
    const { text, userId } = req.body;
    if (!text || !userId) {
      return res.status(400).send('O texto da mensagem e o ID do usuário são obrigatórios.');
    }
    const newMessage = await models.Message.create({
      text,
      userId,
    });
    return res.status(201).json(newMessage);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
  }
});

// ROTA: Eliminar uma mensagem (DELETE)
router.delete('/:messageId', async (req, res) => {
  try {
    const result = await models.Message.destroy({
      where: { id: req.params.messageId },
    });
    if (result === 0) {
      return res.status(404).send('Mensagem não encontrada.');
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor.', details: error.message });
  }
});

export default router;