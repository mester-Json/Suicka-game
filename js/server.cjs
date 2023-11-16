const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '157326',
    database: 'Suika-game'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
    } else {
        console.log('Connexion à la base de données réussie');
    }
});

app.use(express.json());

const publicDirectory = path.join(__dirname, 'public');
app.use('/', express.static(publicDirectory));
app.use(express.static(__dirname));

// Inscription
app.post('/inscription', (req, res) => {
    const { userName, birthday, mail, password } = req.body;
    const newUser = { userName, birthday, mail, password };

    db.query('INSERT INTO utilisateurs SET ?', newUser, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'inscription :', err);
            res.status(500).json({ error: 'Erreur lors de l\'inscription' });
        } else {
            newUser.id = result.insertId;
            res.json(newUser);
        }
    });
});
// Connexion
app.post('/connexion', (req, res) => {
    const { userName, mail, password } = req.body;

    db.query('SELECT * FROM utilisateurs WHERE (userName = ? OR mail = ?) AND password = ?', [userName, mail, password], (err, results) => {
        if (err) {
            console.error('Erreur lors de la connexion :', err);
            res.status(500).json({ error: 'Erreur lors de la connexion' });
        } else {
            if (results.length > 0) {
                // Connexion réussie
                res.status(200).json({ message: 'Connexion réussie' });
            } else {
                // Identifiants incorrects
                res.status(401).json({ error: 'Identifiants incorrects' });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
