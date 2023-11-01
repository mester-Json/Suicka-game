import express from 'express';
import mysql from 'mysql';

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
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

app.post('/items', (req, res) => {
    const { name, description } = req.body;
    const newItem = { name, description };

    db.query('INSERT INTO items SET ?', newItem, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'élément :', err);
            res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'élément' });
        } else {
            newItem.id = result.insertId;
            res.json(newItem);
        }
    });
});

app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des éléments :', err);
            res.status(500).json({ error: 'Erreur lors de la récupération des éléments' });
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
