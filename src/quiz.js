import React, { useState } from 'react';
import questions from './questions.json';
import Toast from './toast';

function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [showScoreScreen, setShowScoreScreen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const startQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScoreScreen(false);
    setQuizStarted(true);
  };

  const handleAnswerOptionClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScoreScreen(true);
      setQuizStarted(false);
    }
  };

   // Move handleShareClick inside the Quiz component
   const handleShareClick = () => {
    const scoreText = `I scored ${score} out of ${questions.length}!\n🌟🌟🌟\n🕊🕊🕊`;
    navigator.clipboard.writeText(scoreText)
      .then(() => {
        setToastMessage("Copied to clipboard!"); // This will trigger the toast to appear
        setShowToast(true); // Assuming you want to control the visibility with this state
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });

    // Optionally, clear the toast message after a duration
    setTimeout(() => {
      setShowToast(false); // Hide the toast
    }, 2000); // This duration should match whatever you have in your Toast component, if it auto-hides
  };


  return (
    <div>


{!quizStarted && !showScoreScreen && (
  <>
  <p>Welcome to the ANZAC Day Quiz. Test your knowledge and learn more about ANZAC Day.</p>
  <button onClick={startQuiz}><strong>Start Quiz</strong></button>
  {/* Add more HTML elements as needed */}
</>
      )}

      {quizStarted && (
        <div>
          <div className='question-section'>
            <div className='question-count'>
              <h2>Question {currentQuestion + 1}/{questions.length}</h2>
            </div>
            <div className='question-text'>
              <h3>{questions[currentQuestion].question}</h3>
            </div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(option)}>{option}</button>
            ))}
          </div>
        </div>
      )}
      {showScoreScreen && (
        <div>
          <p>You scored {score} out of {questions.length}</p>
          {/* Implement sharing functionality as needed */}
          <button onClick={handleShareClick}>Share Score</button>
          
        </div>
      )}
      {showToast && <Toast message={toastMessage} />}
    </div>
  );

 
}




export default Quiz;
