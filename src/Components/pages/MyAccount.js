import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, fetchOrders } from '../../store';
import { OrderLine } from './';

const MyAccount = () => {
  const dispatch = useDispatch();
  const userAuthObj = useSelector(state => state.auth);
  const user = useSelector(state => state.users.usersList.find(e => e.id === userAuthObj.id));
  const orders = useSelector(state => state.orders).filter(order => order.isCart === false);
  console.log('ORDERS FROM MYACCOUNT', orders)

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h2 className='my-account-header'>
        {user && `${user.firstName} ${user.lastName}`}
      </h2>
      {user && (
        <div>
          <img className='user-avatar' src={user.avatar} alt='User Avatar' />
          <p className='my-account-p'>Full Name: {user.firstName} {user.lastName}</p>
          <p className='my-account-p'>Email: {user.email}</p>
          <p className='my-account-p'>Home Address: {user.homeAddress}</p>
          <p className='my-account-p'>Shipping Address: {user.shippingAddress}</p>
        </div>
      )}
      <Link to={`/myaccount/updateuserinfo`}>
        <button className='update-info-button'>Update your information</button>
      </Link>
      <p className='my-account-p'>Order History</p>
      <div className="orderRow">
        <div className='orderCell'>
          <p>Order #</p>
        </div>
        <div className='orderCell'>
          <p>Date</p>
        </div>
        <div className='orderCell'>
          <p>Total</p>
        </div>
      </div>
      {orders.length > 0 ? (
        orders.map(order => <OrderLine key={order.id} order={order} />)
      ) : (
        <p className='my-account-p'>No order history</p>
      )}
    </div>
  );
};

export default MyAccount;