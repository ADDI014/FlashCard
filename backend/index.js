require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Correct MongoDB URI
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://ADDI014:Ankit123@flashcard.qvkcl.mongodb.net/?retryWrites=true&w=majority&appName=FlashCard';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Failed to connect to MongoDB Atlas:', err));

// Define the Flashcard schema
const flashcardSchema = new mongoose.Schema({
    question: String,
    answer: String,
});

// Create a model based on the schema
const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// Define routes
app.get('/flashcards', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        res.json(flashcards);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/flashcards', async (req, res) => {
    try {
        const newFlashcard = new Flashcard(req.body);
        await newFlashcard.save();
        res.json(newFlashcard);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
