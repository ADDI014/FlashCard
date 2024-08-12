require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Flashcard = require('./models/Flashcard');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://ADDI014:Ankit123@flashcard.qvkcl.mongodb.net/?retryWrites=true&w=majority&appName=FlashCard';

// mongoose.connect(mongoURI)
//     .then(() => console.log('Connected to MongoDB Atlas'))
//     .catch(err => console.error('Failed to connect to MongoDB Atlas:', err));


mongoose.connect(mongoURI ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


// Define routes
app.get('/flashcards', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        console.log(flashcards);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
