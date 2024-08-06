import React from 'react';
import './Stats.css'; // Import the CSS file

const Stats = () => {
  return (
    <div className="body">
      <h1>Prioritize your mental health</h1>
      <p>Take the first step. Call us to re-set, re-energize and re-build your life</p>
      <p>Live your life by getting the much-needed support from our experts when needed</p>

      <div className="container">
        <div className="img">
          <img src="https://i.postimg.cc/QxYL3Z6W/com-gif-maker-14-unscreen.gif" alt="Meditation" />
        </div>

        <div className="stat">
          <h2>1 in 3</h2>
          <p>people who message or call us are anxious or suicidal</p>
        </div>
        <div className="stat">
          <h2>10 lakh+</h2>
          <p>confidential conversations have been participated in</p>
        </div>
        <div className="stat">
          <h2>300+</h2>
          <p>universities/colleges have sent us students/interns for training</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
