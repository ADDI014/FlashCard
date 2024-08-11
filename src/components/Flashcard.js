// Flashcard.js

import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ question, answer }) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div onClick={() => setFlipped(!flipped)} className="flashcard">
            {flipped ? answer : question}
        </div>
    );
};

export default Flashcard;
