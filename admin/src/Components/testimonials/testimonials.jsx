import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './testinomials.css';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/testimonials');
      setTestimonials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to fetch testimonials. Please try again later.');
      setLoading(false);
    }
  };

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      await axios.put(`http://localhost:5000/api/testimonials/${id}`, {
        isVisible: !currentVisibility
      });
      // Update local state
      setTestimonials(testimonials.map(t => 
        t._id === id ? { ...t, isVisible: !t.isVisible } : t
      ));
    } catch (error) {
      console.error('Error updating testimonial visibility:', error);
      setError('Failed to update testimonial. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading testimonials...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="testimonial-list">
      <h2>Manage Testimonials</h2>
      <div className="testimonial-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="testimonial-item">
            <p className="testimonial-quote">{testimonial.quote}</p>
            <p className="testimonial-author">- {testimonial.author}</p>
            <p className="testimonial-date">
              {new Date(testimonial.createdAt).toLocaleDateString()}
            </p>
            <div className="testimonial-controls">
              <button
                onClick={() => toggleVisibility(testimonial._id, testimonial.isVisible)}
                className={testimonial.isVisible ? "pause-btn" : "resume-btn"}
              >
                {testimonial.isVisible ? 'Pause' : 'Resume'}
              </button>
              <span className={`status ${testimonial.isVisible ? 'active' : 'paused'}`}>
                {testimonial.isVisible ? 'Active' : 'Paused'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
