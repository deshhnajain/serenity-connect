// src/pages/MoreServices.js
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import './MoreServices.css';

// Import images
import img1 from '../../imgs/moreservices/1.jpeg';
import img2 from '../../imgs/moreservices/2.png';
import img3 from '../../imgs/moreservices/3.jpeg';
import img4 from '../../imgs/moreservices/4.jpeg';
import img5 from '../../imgs/moreservices/5.jpeg';
import img6 from '../../imgs/moreservices/6.jpeg';
import img7 from '../../imgs/moreservices/7.png';
import img8 from '../../imgs/moreservices/8.jpeg';

const cards = [
  { id: 1, name: 'Service A', img: img1 },
  { id: 2, name: 'Service B', img: img2 },
  { id: 3, name: 'Service C', img: img3 },
  { id: 4, name: 'Service D', img: img4 },
  { id: 5, name: 'Service A', img: img5 },
  { id: 6, name: 'Service B', img: img6 },
  { id: 7, name: 'Service C', img: img7 },
  { id: 8, name: 'Service D', img: img8 }
];

const shuffleCards = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const MoreServices = () => {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    setShuffledCards(shuffleCards([...cards]));
  }, []);

  const handleCardClick = (card) => {
    if (selectedCards.length === 2) return;

    setSelectedCards([...selectedCards, card]);

    if (selectedCards.length === 1 && selectedCards[0].name === card.name && selectedCards[0].id !== card.id) {
      setMatchedCards([...matchedCards, selectedCards[0], card]);
      setSelectedCards([]);
    }

    if (selectedCards.length === 1 && selectedCards[0].id !== card.id && selectedCards[0].name !== card.name) {
      setTimeout(() => setSelectedCards([]), 1000);
    }
  };

  const isCardFlipped = (card) => selectedCards.includes(card) || matchedCards.includes(card);

  return (
    <div className="more-services-container">
      <Typography variant="h4" gutterBottom>Fun time pass</Typography>
      <Grid container spacing={3}>
        {shuffledCards.map((card) => (
          <Grid item xs={3} key={card.id}>
            <Card onClick={() => handleCardClick(card)} className="memory-card">
              <CardContent>
                {isCardFlipped(card) ? (
                  <img src={card.img} alt={card.name} className="card-image" />
                ) : (
                  <div className="card-back"></div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {matchedCards.length === cards.length && (
        <Typography variant="h6" className="congratulations-text">Congratulations! You've matched all the cards!</Typography>
      )}
    </div>
  );
};

export default MoreServices;
