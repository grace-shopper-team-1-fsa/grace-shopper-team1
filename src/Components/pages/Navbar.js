import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../../store/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <nav>
      <ul>
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
            <li>
              <div className="nav-link-container">
                <Link to="/checkout">Checkout</Link>
              </div>
            </li>
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
