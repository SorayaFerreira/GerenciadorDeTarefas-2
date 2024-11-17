const db = require('../config/db');

// Listar categorias
exports.listarCategorias = async (req, res) => {
    try {
        const [categorias] = await db.query(`SELECT * FROM Categoria `);
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar categorias' });
    }
};

// Criar uma nova categoria
exports.criarCategoria = async (req, res) => {
    const { nome } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO Categoria (nome) VALUES (?)`,
            [nome]
        );
        res.status(201).json({ id: result.insertId, message: 'Categoria criada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar categoria' });
    }
};

// Listar prioridades disponíveis
exports.listarPrioridades = (req, res) => {
    const prioridades = ['Baixa', 'Media', 'Alta']; // Valores fixos definidos no banco de dados
    res.json(prioridades);
};

// Listar status disponíveis
exports.listarStatus = (req, res) => {
    const status = ['Pendente', 'Em Andamento', 'Concluida']; // Valores fixos definidos no banco de dados
    res.json(status);
};
