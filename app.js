const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para analisar o corpo da requisição como JSON
app.use(bodyParser.json());

// Configurações do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password: '190288',  // sua senha MySQL
    database: 'meu_banco'  // nome do banco de dados
});

// Conexão ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota de cadastro
app.post('/cadastro', (req, res) => {
    const { usuario, senha } = req.body;

    // Verifica se os campos foram preenchidos
    if (!usuario || !senha) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos!' });
    }

    // Insere o usuário no banco de dados
    const query = 'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)';
    const values = [usuario, senha];  // Pode adicionar hash de senha aqui

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados:', err);
            return res.status(500).json({ error: 'Erro no servidor!' });
        }
        res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
