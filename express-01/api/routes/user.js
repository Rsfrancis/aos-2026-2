const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

router.post('/', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await userModel.createUser(name, email);
    res.status(201).json(user); // 201 = criado com sucesso
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const users = await userModel.getUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' }); // 404 = não encontrado
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await userModel.updateUser(req.params.id, name, email);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deletado' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;