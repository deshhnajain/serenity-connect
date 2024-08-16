import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit';
import './Appointementlist.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAppointments = useCallback(async () => {
    const therapistId = localStorage.getItem('therapistId');
    const token = localStorage.getItem('token');

    if (!therapistId || !token) {
      setError('Authentication information not found. Please log in again.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/appointments`, {
        params: { therapistId },
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
    } catch (error) {
      setError('Error fetching appointments. Please try again later.');
      console.error('Error fetching appointments:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleBackClick = () => navigate('/therapist-dashboard');

  const joinMeeting = (jitsiMeetingUrl) => {
    window.open(jitsiMeetingUrl, '_blank', 'noopener,noreferrer');
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(`${API_BASE_URL}/api/appointments/${appointmentId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointments(prevAppointments => 
        prevAppointments.map(app => 
          app._id === appointmentId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      setError('Error updating appointment status. Please try again.');
      console.error('Error updating appointment status:', error);
    }
  };

  if (isLoading) return <div>Loading appointments...</div>;
  if (error) return <div>{error}</div>;
  if (appointments.length === 0) return <div>No appointments found</div>;

  return (
    <div className="appointments-listcontainer">
      <MDBContainer className="py-5">
        <Button onClick={handleBackClick} className="mb-4" variant="primary">
          Back to Dashboard
        </Button>
        <MDBCard>
          <MDBCardBody>
            <MDBCardText className="mb-4">
              <span className="text-primary font-italic me-1">Appointments</span>
            </MDBCardText>
            <MDBListGroup>
              {appointments.map((appointment) => (
                <MDBListGroupItem key={appointment._id} className="d-flex justify-content-between align-items-center p-3">
                  <div>
                    <MDBCardText><strong>Name:</strong> {appointment.name}</MDBCardText>
                    <MDBCardText><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</MDBCardText>
                    <MDBCardText><strong>Time:</strong> {appointment.time}</MDBCardText>
                    <MDBCardText><strong>Notes:</strong> {appointment.notes}</MDBCardText>
                    <MDBCardText><strong>Status:</strong> {appointment.status}</MDBCardText>
                  </div>
                  <div>
                    <Button size="sm" variant="success" onClick={() => joinMeeting(appointment.jitsiMeetingUrl)} className="me-2">
                      Join Meeting
                    </Button>
                    {appointment.status !== 'completed' && (
                      <Button size="sm" variant="primary" onClick={() => updateAppointmentStatus(appointment._id, 'completed')}>
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}