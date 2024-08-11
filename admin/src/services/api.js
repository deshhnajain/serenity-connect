import axios from 'axios';

// Set the base URL for the API
const baseURL = 'http://localhost:5000';

const instance = axios.create({
  baseURL: `${baseURL}/api`, // Adjust the base path as necessary
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

// Example function to store tags in local storage
export const storeTagsInLocalStorage = (tags) => {
  localStorage.setItem('tags', JSON.stringify(tags));
};

export default instance;
