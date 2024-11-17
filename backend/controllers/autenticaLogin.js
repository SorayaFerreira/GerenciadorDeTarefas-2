const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();
require('dotenv').config();

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [username], async (err, results) => {
      if (err) {
          console.error('Erro no servidor:', err);
          return res.status(500).json({ error: 'Erro no servidor' });
      }

      if (results.length === 0) {
          return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const user = results[0];

      // Comparação usando bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ 
          message: 'Login bem-sucedido!', 
          token, 
          redirectUrl: '/PainelGeral' 
      });
  });
});

module.exports = router;