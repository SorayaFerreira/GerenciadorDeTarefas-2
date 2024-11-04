// backend/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();
require('dotenv').config();

// Rota de login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Consulta o usuário pelo email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).send({ message: 'Erro no servidor' });

    if (results.length === 0) {
      return res.status(401).send({ message: 'Usuário não encontrado' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ message: 'Senha incorreta' });
    }

    // Criação do token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).send({ message: 'Login bem-sucedido', token });
  });
});

module.exports = router;
