

// import React, { useState } from 'react';
// import Flashcard from './Flashcard';
// import './FlashcardNavigation.css';

// const FlashcardNavigation = ({ flashcards }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const handleNext = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
//         );
//     };

//     const handlePrevious = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
//         );
//     };

//     return (
//         <div className="flashcard-navigation">
//             {flashcards.length > 0 ? (
//                 <>
//                     <Flashcard
//                         question={flashcards[currentIndex].question}
//                         answer={flashcards[currentIndex].answer}
//                     />
//                     <div className="navigation-buttons">
//                         <button onClick={handlePrevious}>Previous</button>
//                         <button onClick={handleNext}>Next</button>
//                     </div>
//                 </>
//             ) : (
//                 <p>No flashcards available</p>
//             )}
//         </div>
//     );
// };

// export default FlashcardNavigation;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Flashcard from './Flashcard';
import './FlashcardNavigation.css';

const FlashcardNavigation = ({ flashcards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate(); // Initialize navigate

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="flashcard-navigation">
            <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            {flashcards.length > 0 ? (
                <>
                    <Flashcard
                        question={flashcards[currentIndex].question}
                        answer={flashcards[currentIndex].answer}
                    />
                    <div className="navigation-buttons">
                        <button onClick={handlePrevious}>Previous</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                </>
            ) : (
                <p>No flashcards available</p>
            )}
        </div>
    );
};

export default FlashcardNavigation;
