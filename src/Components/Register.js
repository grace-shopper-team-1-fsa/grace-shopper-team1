import React, { useState } from 'react';
//import { attemptLogin } from '../store';
import { useDispatch } from 'react-redux';
import { addUserProfile } from '../store/user.js'

const Register = ()=> {
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ homeAddress, setHomeAddress ] = useState('');
  const [ shipAddress, setShipAddress ] = useState('');
  const [ avatar, setAvatar ] = useState('');

  const register = (ev)=> {
    ev.preventDefault();
    dispatch(addUserProfile({username, password, firstName, lastName, email, homeAddress, shipAddress, avatar}));
    setUsername('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setEmail('')
    setHomeAddress('')
    setShipAddress('')
    setAvatar('')
  };

  return (
    <div>
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
        <input
          placeholder='first name'
          name = 'firstName'
          value={ firstName }
          onChange={(event) => setFirstName(event.target.value)}
        />
        <input
          placeholder='last name'
          name = 'lastName'
          value={ lastName }
          onChange={(event) => setLastName(event.target.value)}
        />
        <input
          placeholder='email'
          name = 'email'
          value={ email }
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          placeholder='home address'
          name = 'homeAddress'
          value={ homeAddress }
          onChange={(event) => setHomeAddress(event.target.value)}
        />
        <input
          placeholder='shipping address'
          name = 'shipAddress'
          value={ shipAddress }
          onChange={(event) => setShipAddress(event.target.value)}
        />
        <input
          placeholder='avatar URL'
          name = 'avatar'
          value={ avatar }
          onChange={(event) => setAvatar(event.target.value)}
        />
        {/* I think we should implement a way to directly upload a photo as the avatar the way a real website would i just dunno how to do that  */}
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
