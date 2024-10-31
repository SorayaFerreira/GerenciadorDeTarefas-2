const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario_mysql',
    password: 'sua_senha_mysql',
    database: 'users_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});