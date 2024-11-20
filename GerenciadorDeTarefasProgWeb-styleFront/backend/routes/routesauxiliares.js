const express = require('express');
const router = express.Router();
const auxiliaresController = require('../controllers/auxiliaresController');

// Rotas auxiliares para o frontend
router.get('/categorias', auxiliaresController.listarCategorias);
router.post('/categorias', auxiliaresController.criarCategoria);
router.get('/prioridades', auxiliaresController.listarPrioridades);
router.get('/status', auxiliaresController.listarStatus);

module.exports = router;