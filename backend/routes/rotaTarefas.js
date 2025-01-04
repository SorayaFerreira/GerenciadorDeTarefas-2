const db = require('../config/db');
const authenticateToken = require('../middleware/authenticateToken');
const express = require('express');
const router = express.Router();

// Criar nova tarefa
router.post('/tasks', authenticateToken, (req, res) => {
  const { name, description, priority } = req.body;
  const user_id = req.user.id;

  console.log('Request body:', req.body); // Adicionado para depuração
  console.log('User ID:', user_id); // Adicionado para depuração

  if (!name || !description || !priority) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const query = 'INSERT INTO tasks (name, description, priority, user_id) VALUES (?, ?, ?, ?)';
  db.query(query, [name, description, priority, user_id], (err, results) => {
    if (err) {
      console.error('Erro ao inserir tarefa no banco de dados:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    res.status(201).json({ message: 'Tarefa criada com sucesso' });
  });
});

// Deletar tarefa
router.delete('/tasks/:id', authenticateToken, (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  const query = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
  db.query(query, [taskId, userId], (err, results) => {
      if (err) {
          console.error('Erro ao deletar tarefa no banco de dados:', err);
          return res.status(500).json({ error: 'Erro no servidor' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  });
});

// Editar tarefa
router.put('/tasks/:id', authenticateToken, (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const { name, description, priority, status } = req.body;

  const query = 'UPDATE tasks SET name = ?, description = ?, priority = ?, status = ? WHERE id = ? AND user_id = ?';
  db.query(query, [name, description, priority, status, taskId, userId], (err, results) => {
      if (err) {
          console.error('Erro ao atualizar tarefa no banco de dados:', err);
          return res.status(500).json({ error: 'Erro no servidor' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      res.status(200).json({ message: 'Tarefa atualizada com sucesso' });
  });
});

// Obter tarefas do usuário logado
router.get('/tasks', authenticateToken, (req, res) => {
  const user_id = req.user.id;
  const query = 'SELECT * FROM tasks WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Erro ao obter tarefas do banco de dados:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;