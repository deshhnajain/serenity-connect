import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './resource.css'; // Import the CSS file
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResources, setFilteredResources] = useState([]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resources');
        setResources(response.data);
        setFilteredResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    const results = resources.filter(resource =>
      resource.heading.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResources(results);
  }, [searchTerm, resources]);

  const handleClick = (id) => {
    console.log('Storing ID:', id);
    localStorage.setItem('selectedResourceId', id);
  };

  return (
    <div className="resources-wrapper">
      <h2 className="header-text">Not feeling well? Book a session on Serenity Connect</h2>
      <div className="searchBox" data-aos="fade-up">
        <input
          type="text"
          placeholder="Search whatever you are going through"
          className="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton">🔍</button>
      </div>
      <div className="button-container" data-aos="fade-up">
        {filteredResources.map(resource => (
          <Link
            key={resource._id}
            to={`/resources/${resource._id}`}
            onClick={() => handleClick(resource._id)}
            className="button-link"
          >
            <button className="button">
              {resource.heading}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Resources;
