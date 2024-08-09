import React from 'react';
import UserList from '../Components/UserList';
import TherapistList from '../Components/TherapistList';

function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UserList />
      <TherapistList />
    </div>
  );
}

export default Dashboard;
