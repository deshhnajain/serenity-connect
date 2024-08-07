import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tag.css'; // Make sure to create this CSS file in the same directory

const Tag = () => {
  const [resource, setResource] = useState(null);
  const [openFacts, setOpenFacts] = useState({});

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const storedId = localStorage.getItem('selectedResourceId');
        console.log('Stored ID:', storedId);

        console.log('Fetching from API...');
        const response = await axios.get(`http://localhost:5000/api/resources/${storedId}`);
        setResource(response.data);
      } catch (error) {
        console.error('Error fetching resource:', error);
      }
    };

    fetchResource();
  }, []);

  const toggleFact = (index) => {
    setOpenFacts(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

   if (!resource) return <div>Loading...</div>;

  return (
    <div className="resource-page">
      <h1>{resource.heading}</h1>
      <div className="content-grid">
        <div className="main-content">
          <div className="image-gallery">
            {resource.photoUrls.map((url, index) => (
              <img key={index} src={url} alt={`resource-${index}`} />
            ))}
          </div>
          <p className="definition">{resource.definition}</p>
          <h2>Videos</h2>
          <div className="video-container">
  {resource.videos.map((video, index) => (
    <div key={index} className="video-wrapper">
      <video
        src={video}
        controls
        muted
        autoPlay
        playsInline
        preload="metadata"
        className="video-player"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  ))}
</div>
          <h2>Myths and Facts</h2>
          <div className="myths-facts-list">
            {resource.mythsAndFacts.map((item, index) => (
              <div key={index} className="myth-fact-item">
                <div 
                  className={`myth ${openFacts[index] ? 'active' : ''}`}
                  onClick={() => toggleFact(index)}
                >
                  <span className="myth-text">{item.question}</span>
                  <span className="toggle-icon">{openFacts[index] ? '−' : '+'}</span>
                </div>
                <div className={`fact ${openFacts[index] ? 'active' : ''}`}>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sidebar">
          <div className="tips-section">
            <h2>Tips</h2>
            <ul className="tips-list">
              {resource.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          <div className="book-session">
            <h2>Book a Session for {resource.heading}</h2>
            <button className="book-now-btn">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tag;