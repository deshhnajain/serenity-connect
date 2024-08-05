import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput
} from 'mdb-react-ui-kit';
import './TherapistDashboard.css'; // Import the CSS file
import { Link } from 'react-router-dom';

export default function TherapistDashboard() {
  const [therapist, setTherapist] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    mobile: '',
    address: '',
    profilePicture: '' ,
    location: '',// Add this field if needed
  });

  useEffect(() => {
    const fetchTherapist = async () => {
      const therapistId = localStorage.getItem('therapistId');
      if (!therapistId) {
        console.error('Therapist ID not found in local storage');
        setError('Therapist ID not found in local storage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3388/api/therapists/${therapistId}`);
        setTherapist(response.data);
        setFormData(response.data); // Initialize formData with fetched data
      } catch (error) {
        console.error('Error fetching therapist data:', error);
        if (error.response && error.response.status === 404) {
          setError('Therapist not found');
        } else {
          setError('Error fetching therapist data');
        }
      }
    };

    fetchTherapist();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const therapistId = localStorage.getItem('therapistId');
      if (!therapistId) {
        setError('Therapist ID not found in local storage');
        return;
      }

      const response = await axios.put(`http://localhost:3388/api/therapists/${therapistId}`, formData);
      setIsEditing(false);
      setTherapist(prevData => ({ ...prevData, ...formData })); // Update state with new data
    } catch (error) {
      console.error('Error updating therapist data:', error);
      setError('Error updating therapist data');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!therapist) {
    return <div>Loading...</div>;
  }

  return (
    <section className="DashBoardContainer">
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center card-body-text-center">
                <MDBCardImage
                  src={formData.profilePicture || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                  alt="avatar"
                  className="DashboardProfile-imgs"
                  fluid
                />
                <p className="text-muted mb-1">{formData.name}</p>
                {/* <p className="text-muted mb-4">{therapist.location}</p> */}
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                    <MDBCardText>Appointments</MDBCardText>
                    <Link to="/appointments">
                      <MDBCardText>View Appointments</MDBCardText>
                    </Link>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <MDBRow className="mb-3">
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                      <MDBCol sm="3">
                        <MDBCardText>Profile Picture URL</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          type="text"
                          name="profilePicture"
                          value={formData.profilePicture}
                          onChange={handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          type="text"
                          name="phone"
                          value={formData.phonenumber}
                          onChange={handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                      {/* <MDBRow className="mb-3">
                        <MDBCol sm="3">
                          <MDBCardText>location</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBInput
                            type="text"
                            name="Location"
                            value={formData.location}
                            onChange={handleInputChange}
                          />
                        </MDBCol>
                      </MDBRow> */}
                    <MDBRow className="mb-3">
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn type="submit">Save</MDBBtn>
                    <MDBBtn onClick={() => setIsEditing(false)} outline className="ms-1">Cancel</MDBBtn>
                  </form>
                ) : (
                  <>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{therapist.name}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{therapist.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Phone</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{therapist.phone || "(097) 234-5678"}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{therapist.address || "please Enter your Address"}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn onClick={() => setIsEditing(true)}>Edit</MDBBtn>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
