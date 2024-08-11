import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import FlashcardNavigation from './components/FlashcardNavigation';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/flashcards')
            .then(res => setFlashcards(res.data))
            .catch(err => console.error('Failed to fetch flashcards:', err));
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route 
                        path="/" 
                        element={<FlashcardNavigation flashcards={flashcards} />} 
                    />
                    <Route 
                        path="/dashboard" 
                        element={<Dashboard />} 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
