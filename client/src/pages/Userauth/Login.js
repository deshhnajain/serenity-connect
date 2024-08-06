// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { handleError } from '../../utils'; // Ensure this handles error notifications
import './LoginSignup.css'; // Import the new CSS file

function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({ ...prevState, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const response = await axios.post("http://localhost:5000/api/login", loginInfo);
            const { success, message, jwtToken, name } = response.data;
            if (success) {
                toast.success(message); // Show success message
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => navigate('/'), 1000);
            } else {
                handleError(message); // Show error message
            }
        } catch (err) {
            handleError(err.response ? err.response.data.message : err.message); // Handle errors
        }
    }

    return (
        <div className="login-signup-wrapper">
            <div className='login-signup-container'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                        />
                    </div>
                    <button type='submit'>Login</button>
                    <span>Doesn't have an account?
                        <Link to="/user-signup">Signup</Link>
                    </span>
                    
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login;
