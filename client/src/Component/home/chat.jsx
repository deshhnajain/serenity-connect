import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Function to fetch messages from the server
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://serenity-connect.onrender.com/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Fetch messages on component mount
    fetchMessages();

    // Polling to fetch messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post('https://serenity-connect.onrender.com/api/messages', {
        content: newMessage,
      });
      setMessages([response.data, ...messages]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='Main-chat-container'>
      <div className="chat-container">
        <h1>Chat Anonymously</h1>
        <div className="messages">
          {messages.map((message) => (
            <div key={message._id} className="message">
              <p>{message.content}</p>
              <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
