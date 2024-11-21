const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const tarefasRoutes = require('./routes/routesTarefas');
const auxiliaresRoutes = require('./routes/routesauxiliares');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    console.log('Corpo da requisição:', req.body);
    console.log('Email:', username);
    console.log('Password:', password);

    if (!username || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Erro no servidor:', err);
            return res.status(500).json({ error: 'Erro no servidor' });
        }

        console.log('Resultados da consulta:', results);
        
        if (results.length > 0) {
            const user = results[0];
            
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Erro no servidor:', err);
                    return res.status(500).json({ error: 'Erro no servidor' });
                }

                console.log('Senha correta:', isMatch);

                if (isMatch) {
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.status(200).json({ message: 'Login bem-sucedido!', token, redirectUrl: '/painelGeral' });
                    
                } else {
                    console.log('Senha incorreta para o usuário:', username);
                    console.log('Senha correta para o usuário:', password);
                    res.status(401).json({ error: 'Credenciais inválidas' });
                    
                }
            });
        } else {
            console.log('Usuário não encontrado:', username);
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    });
});

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../src/build')));
app.use('/api', tarefasRoutes);
app.use('/api', auxiliaresRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/build', 'index.html'));
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});