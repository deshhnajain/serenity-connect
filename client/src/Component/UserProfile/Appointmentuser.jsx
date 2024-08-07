import React, { useEffect, useState } from 'react';
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

export default function AppointmentsUser() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [updatedAppointment, setUpdatedAppointment] = useState({
    date: '',
    time: '',
    notes: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found in local storage');
        setError('Token not found in local storage');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/appointments/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Error fetching appointments');
      }
    };

    fetchAppointments();
  }, []);

  const handleBackClick = () => {
    navigate('/home');
  };

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
      const response = await axios.put(`http://localhost:5000/api/appointments/${currentAppointment._id}`, updatedAppointment, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAppointments((prevAppointments) => 
        prevAppointments.map((appt) => 
          appt._id === currentAppointment._id ? response.data : appt
        )
      );
      setEditModal(false);
    } catch (error) {
      console.error('Error updating appointment:', error);
      setError('Error updating appointment');
    }
  };

  const handleDeleteClick = async (appointmentId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAppointments((prevAppointments) => 
        prevAppointments.filter((appt) => appt._id !== appointmentId)
      );
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setError('Error deleting appointment');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (appointments.length === 0) {
    return <div>No appointments found</div>;
  }

  return (
    <div className="appointmentsuser-listcontainer">
      <MDBContainer className="py-5">
        <button onClick={handleBackClick} className="mb-4">
          Back to Dashboard
        </button>
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
                  </div>
                  <div>
                    <Button size="sm" variant="primary" onClick={() => handleEditClick(appointment)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => handleDeleteClick(appointment._id)}>Delete</Button>
                  </div>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>

      {currentAppointment && (
        <Modal show={editModal} onHide={() => setEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formDate">
                <Form.Label>Date</Form.Label>
                <Form.Control 
                  type="date" 
                  value={updatedAppointment.date} 
                  onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, date: e.target.value })} 
                />
              </Form.Group>
              <Form.Group controlId="formTime">
                <Form.Label>Time</Form.Label>
                <Form.Control 
                  type="time" 
                  value={updatedAppointment.time} 
                  onChange={(e) => setUpdatedAppointment({ ...updatedAppointment, time: e.target.value })} 
                />
              </Form.Group>
              <Form.Group controlId="formNotes">
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
      )}
    </div>
  );
}