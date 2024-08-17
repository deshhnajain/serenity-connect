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
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import './Appointementlist.css'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://serenity-connect.onrender.com';

export default function AppointmentsUser() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [updatedAppointment, setUpdatedAppointment] = useState({
    date: '',
    time: '',
    notes: '',
  });
  const navigate = useNavigate();

  const fetchAppointments = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Authentication token not found. Please log in again.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/appointments/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to fetch appointments. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleBackClick = () => navigate('/home');

  const handleEditClick = (appointment) => {
    setCurrentAppointment(appointment);
    setUpdatedAppointment({
      date: appointment.date.split('T')[0],
      time: appointment.time,
      notes: appointment.notes,
    });
    setEditModal(true);
  };

  const handleEditSave = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(`${API_BASE_URL}/api/appointments/${currentAppointment._id}`, updatedAppointment, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(prevAppointments => 
        prevAppointments.map(app => 
          app._id === currentAppointment._id ? { ...app, ...updatedAppointment } : app
        )
      );
      setEditModal(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Failed to update appointment. Please try again.');
    }
  };

  const handleDeleteClick = async (appointmentId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`${API_BASE_URL}/api/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(prevAppointments => prevAppointments.filter(app => app._id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setError('Failed to delete appointment. Please try again.');
    }
  };

  const joinMeeting = (jitsiMeetingUrl) => {
    window.open(jitsiMeetingUrl, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) return <div>Loading appointments...</div>;
  if (error) return <div>{error}</div>;
  if (appointments.length === 0) return <div>No appointments found</div>;

  return (
    <div className="appointmentsuser-listcontainer">
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
                    <Button size="sm" variant="primary" onClick={() => handleEditClick(appointment)} className="me-2">Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDeleteClick(appointment._id)} className="me-2">Delete</Button>
                    <Button size="sm" variant="success" onClick={() => joinMeeting(appointment.jitsiMeetingUrl)}>Join Meeting</Button>
                  </div>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      <Modal show={editModal} onHide={() => setEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="date" 
                value={updatedAppointment.date} 
                onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, date: e.target.value })} 
              />
            </Form.Group>
            <Form.Group controlId="formTime" className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control 
                type="time" 
                value={updatedAppointment.time} 
                onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, time: e.target.value })} 
              />
            </Form.Group>
            <Form.Group controlId="formNotes" className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={updatedAppointment.notes} 
                onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, notes: e.target.value })} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}