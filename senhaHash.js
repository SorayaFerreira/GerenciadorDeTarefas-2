const bcrypt = require('bcryptjs');

const password = '123'; // Substitua 'sua_senha' pela senha que você deseja hash
bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log('Senha hash:', hash);
});