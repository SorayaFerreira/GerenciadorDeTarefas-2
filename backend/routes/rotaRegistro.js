const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Erro ao inserir usuário no banco de dados:', err);
        return res.status(500).json({ error: 'Erro no servidor' });
      }
      res.status(201).json({ message: 'Usuário cadastrado com sucesso', user_id: results.insertId });
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;