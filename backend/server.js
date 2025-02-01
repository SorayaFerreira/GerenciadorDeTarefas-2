const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json()); // Middleware para processar JSON

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

    // Adicione logs para verificar o corpo da requisição
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

        // Adicione logs para verificar os resultados da consulta
        console.log('Resultados da consulta:', results);

        if (results.length > 0) {
            const user = results[0];

            // Verificar se o usuário está bloqueado
            if (user.loginAttempts > 6) {
                return res.status(403).json({ error: 'Conta bloqueada. Tente novamente mais tarde.' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Erro no servidor:', err);
                    return res.status(500).json({ error: 'Erro no servidor' });
                }

                // Adicione logs para verificar o resultado da comparação de senhas
                console.log('Senha correta:', isMatch);

                if (isMatch) {
                    // Resetar o contador de tentativas de login
                    const resetAttemptsQuery = 'UPDATE users SET loginAttempts = 0 WHERE email = ?';
                    db.query(resetAttemptsQuery, [username], (err, results) => {
                        if (err) {
                            console.error('Erro ao resetar tentativas de login:', err);
                        }
                    });

                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.status(200).json({ message: 'Login bem-sucedido!', token, redirectUrl: '/painelGeral' });
                } else {
                    // Incrementar o contador de tentativas de login
                    const incrementAttemptsQuery = 'UPDATE users SET loginAttempts = loginAttempts + 1 WHERE email = ?';
                    db.query(incrementAttemptsQuery, [username], (err, results) => {
                        if (err) {
                            console.error('Erro ao incrementar tentativas de login:', err);
                        }
                    });

                    console.log('Senha incorreta para o usuário:', username);
                    res.status(401).json({ error: 'Credenciais inválidas' });
                }
            });
        } else {
            console.log('Usuário não encontrado:', username);
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    });
});

// Importar e usar a rota de registro
const rotaRegistro = require('./routes/rotaRegistro');
app.use('/api', rotaRegistro);

// Importar e usar a rota de tarefas
const rotaTarefas = require('./routes/rotaTarefas');
app.use('/api', rotaTarefas);

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../src/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/build', 'index.html'));
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});