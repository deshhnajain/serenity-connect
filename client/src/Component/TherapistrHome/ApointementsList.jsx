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
import './Appointementlist.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const therapistId = localStorage.getItem('therapistId');
      if (!therapistId) {
        console.error('Therapist ID not found in local storage');
        setError('Therapist ID not found in local storage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3388/api/appointments?therapistId=${therapistId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Error fetching appointments');
      }
    };

    fetchAppointments();
  }, []);

  const handleBackClick = () => {
    navigate('/therapist-dashboard');
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (appointments.length === 0) {
    return <div>No appointments found</div>;
  }

  return (
    <div className="appointments-listcontainer">
    <MDBContainer className="py-5">
      <button onClick={handleBackClick} className="mb-4">
        Back to Dashboard
      </button>
      <MDBCard>
        <MDBCardBody>
          <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Appointments</span></MDBCardText>
          <MDBListGroup>
            {appointments.map((appointment) => (
              <MDBListGroupItem key={appointment._id} className="d-flex justify-content-between align-items-center p-3">
                <div>
                  <MDBCardText><strong>Name:</strong> {appointment.name}</MDBCardText>
                  <MDBCardText><strong>Date:</strong> {appointment.date}</MDBCardText>
                  <MDBCardText><strong>Time:</strong> {appointment.time}</MDBCardText>
                  <MDBCardText><strong>Notes:</strong> {appointment.notes}</MDBCardText>
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
