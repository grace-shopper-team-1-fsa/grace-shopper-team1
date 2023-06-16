import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { attemptLogin } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { addUserProfile } from '../../store/user.js';

const LoginRegister = (props) => {
  const {handleLoginFromCheckout} = props;
  const {isCart} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth)
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
      ev.preventDefault();
      dispatch(attemptLogin(credentials)).then(() => {
        if (auth.id) {
          navigate('/');
        }
      });
      handleLoginFromCheckout;
  };

  const register = async (ev) => {
    ev.preventDefault();
    await dispatch(addUserProfile({ email, password, permissions: false }));
    credentials.email = email;
    credentials.password = password;
    await dispatch(attemptLogin(credentials));
    setEmail('');
    setPassword('');

    if(isCart){
      handleLoginFromCheckout;
    } else{
      navigate('/');
    }
  };

  return (
    <div className="loginRegister">
      <div className="loginRegisterBox">
        <h2>Returning users</h2>
        <hr className="formDivider" />
        <form onSubmit={login}>
            {auth.error === true && (
              <div>
                <p>Invalid email or password!</p>
              </div>
            )}
          <div className="inputContainer">
            <input
              placeholder="email"
              value={credentials.email}
              name="email"
              onChange={onChange}
            />
            <input
              placeholder="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <button className="loginButton">Login</button>
          </div>
        </form>
      </div>

      <div className="loginRegisterBox">
        <h2>New Users</h2>
        <hr className="formDivider" />
        <form onSubmit={register}>
          <div className="inputContainer">
            <input
              placeholder="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="registerButton">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
