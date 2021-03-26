import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialForm = {
  username: '',
  password:''
}

const initialError = {
  error:''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialError);
  const { push } = useHistory();

  const handleChange = (e) => {
    setForm({
    ...form,
    [e.target.name]: e.target.value
    })
  }

   const handleSubmit = (e) => {
     e.preventDefault();
    axios
    .post(`http://localhost:5000/api/login`, form)
    .then(res => {
      window.localStorage.setItem('token', res.data.payload);
      push('/BubblePage')
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      setError(err.response.data)
    })
  };
  

  return (
    <>
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input 
            type='text'
            name='username'
            value={form.username}
            onChange={handleChange}
          />
          <label>Password:</label>
          <input 
            type='text'
            name='password'
            value={form.password}
            onChange={handleChange}
          />
          <button>Login</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error.error}</p>
    </div>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.