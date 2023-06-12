import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../../store/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth);
  console.log("USERNAME",user)

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <nav>
      <ul className="home-ul">
        <li>
          <div className="nav-link-container">
            <Link to="/">Home</Link>
          </div>
        </li>
      </ul>
      <div className="brand-name">Vase Shopper</div>
      <ul className="other-ul">
        <li>
          <div>
            <h6>Hello, {user.firstName}</h6>
          </div>
        </li>
        <li>
          <div className="nav-link-container">
            <Link to="/cart">Cart</Link>
          </div>
        </li>
        {Object.keys(user).length > 0 ? (
          <>
            <li>
              <div className="nav-link-container">
                <Link to="/myaccount">My Account</Link>
              </div>
            </li>
            {user.permissions === true && (
              <li>
                <div className="nav-link-container">
                  <Link to="/admin">Admin</Link>
                </div>
              </li>
            )}
            <li>
              <div className="nav-link-container">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </li>
          </>
        ) : (
          <li>
            <div className="nav-link-container">
              <Link to="/login">Login</Link>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;