import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { attemptLogin } from '../../store';
import { useDispatch } from 'react-redux';
import { addUserProfile } from '../../store/user.js';

const LoginRegister = ()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const onChange = ev => {
    setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
  };

  const login = (ev)=> {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate('/')
  };

  const register = async(ev)=> {
    
    ev.preventDefault();
    await dispatch(addUserProfile({email, password, permissions: false}));
    credentials.email = email;
    credentials.password = password;
    dispatch(attemptLogin(credentials));
    setEmail('')
    setPassword('')
    navigate('/')
  };

  return (
    <div className="loginRegister">
      <div className="loginRegisterBox">
        <h2>Login</h2>
        <form onSubmit={ login }>
          <input
            placeholder='email'
            value = { credentials.email }
            name = 'email'
            onChange = { onChange }
            />
          <input
            placeholder='password'
            type = 'password'
            name ="password"
            value={ credentials.password }
            onChange = { onChange }
          />
          <button>Login</button>
        </form>
      </div>

      <div className="loginRegisterBox">
        <h2>Register</h2>
        <form onSubmit={ register }>
          <input
            placeholder='email'
            name = 'email'
            value = { email }
            onChange={(event) => setEmail(event.target.value)}
            />
          <input
            placeholder='password'
            type ="password"
            name = 'password'
            value={ password }
            onChange={(event) => setPassword(event.target.value)}
          />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;