import React, { useState } from 'react';
import './MentalHealthCheck.css';

const questions = [
  {
  id: 1,
  text: 'How often do you feel stressed?',
  options: [
  { text: 'Never', score: 0 },
  { text: 'Rarely', score: 2 },
  { text: 'Sometimes', score: 4 },
  { text: 'Often', score: 6 },
  { text: 'Always', score: 10 },
  ],
  },
  {
  id: 2,
  text: 'How often do you have trouble sleeping due to anxiety?',
  options: [
  { text: 'Never', score: 0 },
  { text: 'Rarely', score: 2 },
  { text: 'Sometimes', score: 4 },
  { text: 'Often', score: 6 },
  { text: 'Always', score: 10 },
  ],
  },
  {
  id: 3,
  text: 'How often do you feel overwhelmed by responsibilities?',
  options: [
  { text: 'Never', score: 0 },
  { text: 'Rarely', score: 2 },
  { text: 'Sometimes', score: 4 },
  { text: 'Often', score: 6 },
  { text: 'Always', score: 10 },
  ],
  },
  {
  id: 4,
  text: 'How often do you feel sad or depressed?',
  options: [
  { text: 'Never', score: 0 },
  { text: 'Rarely', score: 2 },
  { text: 'Sometimes', score: 4 },
  { text: 'Often', score: 6 },
  { text: 'Always', score: 10 },
  ],
  },
  {
  id: 5,
  text: 'How often do you feel irritable or angry?',
  options: [
  { text: 'Never', score: 0 },
  { text: 'Rarely', score: 2 },
  { text: 'Sometimes', score: 4 },
  { text: 'Often', score: 6 },
  { text: 'Always', score: 10 },
  ],
  },
  {
  id: 6,
  text: 'How often do you find it difficult to concentrate?',
  options: [
  { text: 'Never', score: 0 },
  { text: 'Rarely', score: 2 },
  { text: 'Sometimes', score: 4 },
  { text: 'Often', score: 6 },
  { text: 'Always', score: 10 },
  ],
  },
  {
  id: 7,
  text: 'How often do you feel lonely?',
  options: [
  { text: 'Never', score: 0 },
  { text: 'Rarely', score: 2 },
  { text: 'Sometimes', score: 4 },
  { text: 'Often', score: 6 },
  { text: 'Always', score: 10 },
  ],
  },
  {
  id: 8,
  text: 'How often do you feel a lack of interest in activities you used to enjoy?',
  options: [
  { text: 'Never', score: 0 },
  { text: 'Rarely', score: 2 },
  { text: 'Sometimes', score: 4 },
  { text: 'Often', score: 6 },
  { text: 'Always', score: 10 },
  ],
  },
  {
  id: 9,
  text: 'How often do you feel tired or have low energy?',
  options: [
  { text: 'Never', score: 0 },
  { text: 'Rarely', score: 2 },
  { text: 'Sometimes', score: 4 },
  { text: 'Often', score: 6 },
  { text: 'Always', score: 10 },
  ],
  },
  
  {
  id: 10,
  text: 'How often do you find it hard to relax?',
  options: [
  { text: 'Never', score: 0 },
  { text: 'Rarely', score: 2 },
  { text: 'Sometimes', score: 4 },
  { text: 'Often', score: 6 },
  { text: 'Always', score: 10 },
  ],
  },
  
  ]

const MentalHealthCheck = () => {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(null);
  const [description, setDescription] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (selectedScore) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = selectedScore;
    setResponses(newResponses);
    setSelectedOption(selectedScore);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    const totalScore = responses.reduce((total, response) => total + (response || 0), 0);
    const maxPossibleScore = questions.length * 10; // Maximum score possible
    const scoreOutOf100 = Math.round((totalScore / maxPossibleScore) * 100); // Normalize to 100
    setScore(scoreOutOf100);
    generateDescription(scoreOutOf100);
  };

  const generateDescription = (score) => {
    if (score <= 20) {
      setDescription('Your mental health seems to be in good condition.');
    } else if (score <= 40) {
      setDescription('You might be experiencing mild mental health issues.');
    } else if (score <= 60) {
      setDescription('You might be experiencing moderate mental health issues.');
    } else if (score <= 80) {
      setDescription('You might be experiencing severe mental health issues.');
    } else {
      setDescription('You might be experiencing extremely severe mental health issues.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption !== null) {
      handleNextQuestion();
    } else {
      alert('Please select an answer before proceeding.');
    }
  };

  return (
    <div className="mental-health-check">
      <h2>Mental Health Check</h2>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>
      {score === null ? (
        <form onSubmit={handleSubmit}>
          <div className="question">
            <p className="question-text">{questions[currentQuestionIndex].text}</p>
            <div className="options">
              {questions[currentQuestionIndex].options.map((option) => (
                <label key={option.text} className="option">
                  <input
                    type="radio"
                    name={`question-${questions[currentQuestionIndex].id}`}
                    value={option.score}
                    checked={selectedOption === option.score}
                    onChange={() => handleOptionChange(option.score)}
                    required
                  />
                  <span className="option-text">{option.text}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="next-button">
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
          </button>
        </form>
      ) : (
        <div className="results">
          <h3 className="result-title">Your Mental Health Score: {score}</h3>
          <p className="result-description">{description}</p>
          <div className="report">
            <h4 className="report-title">Tips To Keep your Mental Health Healthy</h4>
            <ul className="report-list">
              <li className="report-item">
                <p className="report-question">Keep a check on your thoughts and emotions</p>
              </li>
              <li className="report-item">
                <p className="report-question">Maintain a routine and a work-life balance</p>
              </li>
              <li className="report-item">
                <p className="report-question">Consult with a mental health professional</p>
              </li>
              <li className="report-item">
                <p className="report-question">Physical exercise and a good diet are recommended</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentalHealthCheck;
