import React, { useEffect, useState } from 'react';
import axios from '../services/api';

function TherapistList() {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/therapists')
      .then(response => {
        setTherapists(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the therapists!', error);
      });
  }, []);

  return (
    <div>
      <h2>Therapist List</h2>
      <ul>
        {therapists.map(therapist => (
          <li key={therapist.id}>{therapist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TherapistList;
