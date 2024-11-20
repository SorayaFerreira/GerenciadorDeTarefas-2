const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

// Rotas de Tarefas
router.post('/tarefas', tarefasController.criarTarefa);
router.get('/tarefas', tarefasController.listarTarefas);
router.put('/tarefas/:id', tarefasController.atualizarTarefa);
router.delete('/tarefas/:id', tarefasController.deletarTarefa);
router.get('/tarefas/filtrar', tarefasController.filtrarTarefas);
router.get('/tarefas/historico', tarefasController.historicoConcluidas);
router.get('/tarefas/notificar', tarefasController.notificarTarefas);

module.exports = router;