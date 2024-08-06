import React, { useState, useEffect } from 'react';
import './QuoteComponent.css';

const QUOTE_TYPING_SPEED = 25; // Speed of typing
const QUOTE_DELAY = 2000; // Delay before next quote

const quotes = [
    "Mental health is not a destination, but a process. It’s about how you drive, not where you’re going. – Noam Shpancer",
    "It’s okay to not be okay, but it’s not okay to stay that way. – Unknown",
    "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity. – Unknown",
    "You don’t have to control your thoughts. You just have to stop letting them control you. – Dan Millman",
    "The only journey is the one within. – Rainer Maria Rilke",
    "Healing takes time, and asking for help is a courageous step. – Mariska Hargitay",
    "Self-care is giving the world the best of you, instead of what’s left of you. – Katie Reed",
    "You are not alone in this. We are all in this together. – Unknown",
    "The greatest wealth is to live content with little. – Plato",
    "Your mental health is more important than any other aspect of your life. – Unknown",
    "The mind is like water. When it’s turbulent, it’s difficult to see. When it’s calm, everything becomes clear. – Prasad Mahes",
    "Mental health is just as important as physical health. – Unknown",
    "Sometimes the most productive thing you can do is relax. – Mark Black",
    "You are not your illness. You have a name, a history, a story. Keep living. – Unknown",
    "It’s okay to ask for help. It’s okay to be vulnerable. It’s okay to not be okay. – Unknown",
    "Self-care is how you take your power back. – Lalah Delia",
    "It’s not the load that breaks you down; it’s the way you carry it. – Lou Holtz",
    "You don’t have to be positive all the time. It’s okay to feel sad, angry, or anxious. It’s okay to feel. – Unknown",
    "A person’s a person, no matter how small. – Dr. Seuss",
    "Your mental health is worth investing in. – Unknown",
    "It’s important to take time for yourself, to reflect and recharge. – Unknown",
    "Don’t be ashamed of your story. It will inspire others. – Unknown",
    "Taking care of yourself doesn’t mean me first, it means me too. – L.R. Knost",
    "The bravest thing I ever did was continuing my life when I wanted to die. – Juliette Lewis",
    "You are not alone. You are seen. You are heard. – Unknown",
    "The best way out is always through. – Robert Frost",
    "It’s okay to take a break. It’s okay to take care of yourself. – Unknown",
    "Your story is valid. Your feelings are valid. You matter. – Unknown",
    "You don’t have to be strong every day. Just try to be strong today. – Unknown",
    "Every day may not be good, but there is something good in every day. – Unknown",
    "Your mind is a garden. Your thoughts are the seeds. You can grow flowers or weeds. – Unknown",
    "Don’t let your mind bully your body into believing it must carry the burden of its worries. – Unknown",
    "It’s okay to take up space. It’s okay to be seen. It’s okay to be heard. – Unknown",
    "You are allowed to be both a masterpiece and a work in progress simultaneously. – Sophia Bush",
    "Sometimes the hardest part of the journey is believing you’re worthy of the trip. – Unknown",
    "Self-love is not selfish. You cannot truly love another until you know how to love yourself. – Unknown",
    "Healing is not linear. It’s okay to have setbacks. – Unknown",
    "No matter how you feel, get up, dress up, show up, and never give up. – Unknown",
    "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity. – Unknown",
    "You are stronger than you think. Braver than you believe. And loved more than you know. – Unknown",
    "Sometimes the best way to heal is to simply be present. – Unknown",
    "The only way out is through. – Robert Frost",
    "You are more than your scars. You are more than your trauma. You are a beautiful soul. – Unknown",
    "Your story isn’t over yet. It’s still being written. – Unknown",
    "Self-care is how you take your power back. – Lalah Delia",
    "You are not alone. We are all in this together. – Unknown",
    "There is no shame in taking a break. There is no shame in taking care of yourself. – Unknown",
    "You deserve to be happy. You deserve to be healthy. – Unknown",
    "The journey of a thousand miles begins with a single step. – Lao Tzu",
    "Remember that your mental health is just as important as your physical health. – Unknown"
  ];
  

const QuoteComponent = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (quotes.length === 0) return; // Handle empty quotes array
  
    setCurrentQuote(''); // Reset currentQuote to empty string
    const quote = quotes[quoteIndex];
    if (!quote) return; // Handle null or undefined quote
  
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index >= quote.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, QUOTE_DELAY);
      } else {
        setCurrentQuote(quote.substring(0, index + 1)); // Update currentQuote from the beginning
        index += 1;
      }
    }, QUOTE_TYPING_SPEED);
  
    return () => {
      clearInterval(typeInterval);
    };
  }, [quoteIndex]);

  return (
    <div className="quote-component">
      <p className="quote-text">{currentQuote}</p>
    </div>
  );
};

export default QuoteComponent;
