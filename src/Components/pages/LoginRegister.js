import React, { useState } from 'react';
import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { addUserProfile } from '../../store/user.js'

const LoginRegister = ()=> {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const onChange = ev => {
    setCredentials({...credentials, [ ev.target.name ]: ev.target.value });
  };

  const login = (ev)=> {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };

  const register = (ev)=> {
    ev.preventDefault();
    dispatch(addUserProfile({username, password}));
    setUsername('')
    setPassword('')
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={ login }>
        <input
          placeholder='username'
          value = { credentials.username }
          name = 'username'
          onChange = { onChange }
          />
        <input
          placeholder='password'
          name = 'password'
          value={ credentials.password }
          onChange = { onChange }
        />
        <button>Login</button>
      </form>

      <h2>Register</h2>
      <form onSubmit={ register }>
        <input
          placeholder='username'
          name = 'username'
          value = { username }
          onChange={(event) => setUsername(event.target.value)}
          />
        <input
          placeholder='password'
          name = 'password'
          value={ password }
          onChange={(event) => setPassword(event.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default LoginRegister;
