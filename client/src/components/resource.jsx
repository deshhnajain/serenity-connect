import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:3388/api/resources');
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div>
      <h2>Resources</h2>
      {resources.length > 0 ? (
        <ul>
          {resources.map((resource) => (
            <li key={resource._id}>
              <h1>{resource.tag}</h1>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.link} target="_blank" rel="noopener noreferrer">Learn more</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources available.</p>
      )}
    </div>
  );
};

export default ResourceList;