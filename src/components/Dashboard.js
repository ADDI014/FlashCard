import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
    const [editMode, setEditMode] = useState(false);
    const [editFlashcardId, setEditFlashcardId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/flashcards')
            .then(res => setFlashcards(res.data))
            .catch(err => console.error('Error fetching flashcards:', err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFlashcard({ ...newFlashcard, [name]: value });
    };

    const handleAddFlashcard = () => {
        axios.post('http://localhost:3000/flashcards', newFlashcard)
            .then(res => setFlashcards([...flashcards, { ...newFlashcard, id: res.data.id }]))
            .catch(err => console.error('Error adding flashcard:', err));
        setNewFlashcard({ question: '', answer: '' });
    };

    const handleEditFlashcard = (id) => {
        const flashcard = flashcards.find(f => f.id === id);
        setNewFlashcard({ question: flashcard.question, answer: flashcard.answer });
        setEditMode(true);
        setEditFlashcardId(id);
    };

    const handleUpdateFlashcard = () => {
        axios.put(`http://localhost:3000/flashcards/${editFlashcardId}`, newFlashcard)
            .then(() => {
                setFlashcards(flashcards.map(f => 
                    f.id === editFlashcardId ? { ...f, ...newFlashcard } : f
                ));
                setEditMode(false);
                setNewFlashcard({ question: '', answer: '' });
            })
            .catch(err => console.error('Error updating flashcard:', err));
    };

    const handleDeleteFlashcard = (id) => {
        axios.delete(`http://localhost:3000/flashcards/${id}`)
            .then(() => setFlashcards(flashcards.filter(f => f.id !== id)))
            .catch(err => console.error('Error deleting flashcard:', err));
    };

    return (
        <div className="dashboard">
            <h2>Flashcard Dashboard</h2>
            <button onClick={() => navigate('/')}>View All Flashcards</button> {/* New button for navigation */}
            <div className="flashcard-form">
                <input
                    type="text"
                    name="question"
                    placeholder="Question"
                    value={newFlashcard.question}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="answer"
                    placeholder="Answer"
                    value={newFlashcard.answer}
                    onChange={handleInputChange}
                />
                {editMode ? (
                    <button onClick={handleUpdateFlashcard}>Update Flashcard</button>
                ) : (
                    <button onClick={handleAddFlashcard}>Add Flashcard</button>
                )}
            </div>
            <ul className="flashcard-list">
                {flashcards.map((flashcard) => (
                    <li key={flashcard.id}>
                        <span>{flashcard.question}</span>
                        <button onClick={() => handleEditFlashcard(flashcard.id)}>Edit</button>
                        <button onClick={() => handleDeleteFlashcard(flashcard.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
