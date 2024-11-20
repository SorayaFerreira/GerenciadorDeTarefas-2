const db = require('../config/db');

// Criar uma nova tarefa
exports.criarTarefa = async (req, res) => {
    const { titulo, descricao, data_vencimento, prioridade, categoria_id } = req.body;
    const usuarioId = req.user.id; // ID do usuário autenticado

    try {
        const [result] = await db.query(
            `INSERT INTO Tarefa (titulo, descricao, data_vencimento, prioridade, categoria_id, usuario_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [titulo, descricao, data_vencimento, prioridade, categoria_id || null, usuarioId]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar a tarefa' });
    }
};

// Listar tarefas do usuário
exports.listarTarefas = async (req, res) => {
    const { status, categoria_id, ordem } = req.query;
    const usuarioId = req.user.id;

    try {
        let query = `SELECT * FROM Tarefa WHERE usuario_id = ?`;
        const params = [usuarioId];

        if (status) {
            query += ` AND status = ?`;
            params.push(status);
        }

        if (categoria_id) {
            query += ` AND categoria_id = ?`;
            params.push(categoria_id);
        }

        if (ordem) {
            query += ` ORDER BY ${ordem}`; // Ex.: "data_vencimento ASC", "prioridade DESC"
        }

        const [tarefas] = await db.query(query, params);
        res.json(tarefas);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
};

// Atualizar uma tarefa
exports.atualizarTarefa = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, data_vencimento, prioridade, status, categoria_id } = req.body;

    try {
        await db.query(
            `UPDATE Tarefa SET titulo = ?, descricao = ?, data_vencimento = ?, prioridade = ?, status = ?, categoria_id = ?
             WHERE id = ? AND usuario_id = ?`,
            [titulo, descricao, data_vencimento, prioridade, status, categoria_id || null, id, req.user.id]
        );
        res.json({ message: 'Tarefa atualizada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
    }
};

// Deletar uma tarefa
exports.deletarTarefa = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM Tarefa WHERE id = ? AND usuario_id = ?`, [id, req.user.id]);
        res.json({ message: 'Tarefa deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar a tarefa' });
    }
};

// Filtrar tarefas
exports.filtrarTarefas = async (req, res) => {
    const { prioridade, data_vencimento } = req.query;
    const usuarioId = req.user.id;

    try {
        let query = `SELECT * FROM Tarefa WHERE usuario_id = ?`;
        const params = [usuarioId];

        if (prioridade) {
            query += ` AND prioridade = ?`;
            params.push(prioridade);
        }

        if (data_vencimento) {
            query += ` AND data_vencimento = ?`;
            params.push(data_vencimento);
        }

        const [tarefas] = await db.query(query, params);
        res.json(tarefas);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao filtrar tarefas' });
    }
};

// Histórico de tarefas concluídas
exports.historicoConcluidas = async (req, res) => {
    const usuarioId = req.user.id;

    try {
        const [historico] = await db.query(
            `SELECT * FROM Tarefa WHERE usuario_id = ? AND status = 'Concluida'`,
            [usuarioId]
        );
        res.json(historico);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar histórico de tarefas concluídas' });
    }
};

// Notificações de tarefas atrasadas ou próximas do vencimento
exports.notificarTarefas = async (req, res) => {
    const usuarioId = req.user.id;

    try {
        const [tarefas] = await db.query(
            `SELECT * FROM Tarefa WHERE usuario_id = ? AND 
             (data_vencimento < CURDATE() OR DATEDIFF(data_vencimento, CURDATE()) <= 1)`,
            [usuarioId]
        );
        res.json(tarefas);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar tarefas para notificação' });
    }
};
