const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ankit@132asdf',
    database: 'flashcardDB'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// Get all flashcards
app.get('/flashcards', (req, res) => {
    const query = 'SELECT * FROM flashcards';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Add a new flashcard
app.post('/flashcards', (req, res) => {
    const { question, answer } = req.body;
    const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
    db.query(query, [question, answer], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId });
    });
});

// Update a flashcard
app.put('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
    db.query(query, [question, answer, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Flashcard updated');
    });
});

// Delete a flashcard
app.delete('/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM flashcards WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Flashcard deleted');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
