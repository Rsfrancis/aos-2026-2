const express = require('express');
const router = express.Router();
const messageModel = require('../models/message');

router.post('/', async (req, res, next) => {
  try {
    const { content, user_id } = req.body;
    const message = await messageModel.createMessage(content, user_id);
    res.status(201).json(message); // 201 = criado com sucesso
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const messages = await messageModel.getMessages();
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const message = await messageModel.getMessageById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Mensagem não encontrada' }); // 404 = não encontrado
    }
    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { content } = req.body;
    const message = await messageModel.updateMessage(req.params.id, content);
    if (!message) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }
    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await messageModel.deleteMessage(req.params.id);
    res.status(200).json({ message: 'Message deletada' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;