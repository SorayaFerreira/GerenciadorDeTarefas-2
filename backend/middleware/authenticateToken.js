const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token recebido:', token); // Adicionado para depuração

    if (token == null) return res.status(401).json({ message: 'Token não encontrado' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error('Erro ao verificar token:', err); // Adicionado para depuração
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;