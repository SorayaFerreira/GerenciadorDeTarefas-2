const bcrypt = require('bcryptjs');
const password = '123'; // A senha que você deseja armazenar

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    // Agora você pode usar o 'hash' para inserir no banco de dados
    console.log('Senha hash:', hash);
});