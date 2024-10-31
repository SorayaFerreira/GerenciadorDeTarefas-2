const db = require('../config/db');

exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no servidor' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login bem-sucedido!' });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
};