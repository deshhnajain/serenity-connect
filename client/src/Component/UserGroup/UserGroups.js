import React from 'react';
import './UserGroups.css'; // Optional: for styling

const userGroupsData = [
  {
    id: 1,
    name: "Mindfulness & Meditation",
    description: "A group dedicated to mindfulness practices and meditation techniques to promote mental well-being.",
  },
  {
    id: 2,
    name: "Stress Management",
    description: "Strategies and discussions focused on managing and reducing stress in daily life.",
  },
  {
    id: 3,
    name: "Support for Anxiety",
    description: "A supportive community for individuals dealing with anxiety and its impact.",
  },
  {
    id: 4,
    name: "Depression Recovery",
    description: "Resources and support for individuals working towards overcoming depression.",
  },
  {
    id: 5,
    name: "Self-Care Practices",
    description: "Sharing and learning about self-care routines to enhance overall mental health.",
  },
];

const UserGroups = () => {
  return (
    <div className="user-groups-wrapper">
      <h1>Your Joined Groups</h1>
      <div className="user-groups-list">
        {userGroupsData.map((group) => (
          <div key={group.id} className="group-item">
            <h2>{group.name}</h2>
            <p>{group.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGroups;
