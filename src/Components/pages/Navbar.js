import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation} from 'react-router-dom';

import { logout } from '../../store/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const lineItems = useSelector(state=>state.cart.lineItems);

  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav>
      <div className="hamburger-menu" onClick={toggleDropdown}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {dropdownOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          {Object.keys(user).length > 0 && (
            <>
              <li>
                <Link to="/myaccount">My Account</Link>
              </li>
              {user.permissions === true && (
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              )}
            </>
          )}
        </ul>
      )}
      <Link to="/" className="brand-name">Vase Shopper</Link>
      <ul className="other-ul">
        <li>
          <div className="nav-link-container">
            <Link to="/cart">Cart 
              ({lineItems.length > 0 ?
                lineItems.reduce((acc,value) => {
                  return Number(acc)+ Number(value.quantity);
                },0) : 0
              })
            </Link>
          </div>
        </li>
        {Object.keys(user).length > 0 ? (
          <li>
            <div className="nav-link-container">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </li>
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