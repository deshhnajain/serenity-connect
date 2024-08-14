import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TherapistList = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/therapists');
        setTherapists(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching therapists');
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="therapist-list">
      <h2>Therapist List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {therapists.map((therapist) => (
            <tr key={therapist._id}>
              <td>{therapist._id}</td>
              <td>{therapist.name}</td>
              <td>{therapist.email}</td>
              <td>{therapist.specialization}</td>
              <td>{new Date(therapist.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TherapistList;
