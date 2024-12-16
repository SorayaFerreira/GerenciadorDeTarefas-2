router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [username], async (err, results) => {
      if (err) return res.status(500).send({ message: 'Erro no servidor' });

      if (results.length === 0) {
        return res.status(401).send({ message: 'Usuário não encontrado' });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send({ message: 'Senha incorreta' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).send({ message: 'Login bem-sucedido', token, user_id: user.id });
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send({ message: 'Erro no servidor' });
  }
});