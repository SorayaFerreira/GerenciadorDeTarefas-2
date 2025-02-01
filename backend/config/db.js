const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  else{
    console.log('Conectado ao banco de dados.');
  }

  // Verificar se a tabela 'tasks' existe e criar se não existir
  const createTasksTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      priority INT,
      user_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createTasksTableQuery, (err, result) => {
    if (err) {
      console.error('Erro ao criar tabela tasks:', err);
      return;
    }
    console.log('Tabela tasks verificada/criada com sucesso.');
  });
});

module.exports = db;