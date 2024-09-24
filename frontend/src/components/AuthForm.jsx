import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api'; 
import './AuthForm.css'; 

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
       
        const data = await loginUser({ email, password });
        localStorage.setItem('token', data.token);
      } else {
       
        await registerUser({ email, password });
      }
      navigate('/RecipeList');
    } catch (err) {
      setError('Authentication failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <p className="me-2">Don't have an account?</p>
            <Link className="text-decoration-none" to={isLogin ? "/register" : "/login"}>
              {isLogin ? 'Register' : 'Login'}
            </Link>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
