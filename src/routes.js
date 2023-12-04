// routes.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'inicio.html'));
});

router.get('/atletas', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'atletas.html'));
});

router.get('/esportes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'esportes.html'));
});

router.get('/sign-in', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'signin.html'));
});

router.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'signup.html'));
});

router.get('/tecnicos', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'tecnicos.html'));
});

router.get('/times', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'times.html'));
});

router.post('/cadastrar', (req, res) => {
    const { nome, email, senha, cargo, descricao, perfil } = req.body;

    db.run(`
      INSERT INTO usuarios (nome, email, senha, cargo, descricao, perfil)
      VALUES (?, ?, ?, ?, ?, ?);
    `, [nome, email, senha, cargo, descricao, perfil], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        } else {
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        }
    });
});

router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    db.get(`
      SELECT * FROM usuarios
      WHERE email = ? AND senha = ?
    `, [email, senha], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao autenticar usuário');
        } else {
            if (row) {
                res.status(200).json({
                    id: row.id,
                    nome: row.nome,
                    email: row.email,
                    cargo: row.cargo
                });
            } else {
                res.status(401).send('Email ou senha incorretos');
            }
        }
    });
});

router.get('/api/atletas', (req, res) => {
    db.all(`
        SELECT nome, email, descricao, perfil FROM usuarios
        WHERE cargo = 'atleta'
    `, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Erro ao obter informações de atletas' });
        } else {
            res.status(200).json(rows);
        }
    });
});

router.get('/api/tecnicos', (req, res) => {
    db.all(`
        SELECT nome, email, descricao, perfil FROM usuarios
        WHERE cargo = 'tecnico'
    `, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Erro ao obter informações de técnicos' });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Adicione esta rota em routes.js
router.get('/api/usuarios/perfil/:nome', (req, res) => {
    const nomeUsuario = req.params.nome;

    db.get(`
        SELECT perfil FROM usuarios
        WHERE nome = ?
    `, [nomeUsuario], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Erro ao obter perfil do usuário' });
        } else {
            if (row) {
                res.status(200).json({ perfil: row.perfil });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        }
    });
});


module.exports = router;