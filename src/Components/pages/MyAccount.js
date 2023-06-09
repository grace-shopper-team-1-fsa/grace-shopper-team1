import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers, fetchOrders } from '../../store';
import {OrderLine} from './OrderLine';

const MyAccount = () =>{

    const dispatch = useDispatch();
    const userAuthObj = useSelector(state => state.auth);
    const user = useSelector(state=>state.users.usersList.find(e=>e.id === userAuthObj.id));
    const orders = useSelector(state=>state.orders).filter(order=>order.isCart == false)
 
    useEffect(() => {
        dispatch(fetchAllUsers())
        dispatch(fetchOrders())
    }, [dispatch])

    return (
        <div>
          <h2>User</h2>
          {user && (
            <div>
              <p>Full Name: {user.firstName} {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Home Address: {user.homeAddress}</p>
              <p>Shipping Address: {user.shippingAddress}</p>
              <p>Avatar: {user.avatar}</p>
            </div>
          )}
          <Link to={`/myaccount/updateuserinfo`}>
            <h3>Update your information</h3>
          </Link>
          <p>Order History</p>
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
          { orders.length > 0 ?
            orders.map(order=>{
              return(
                <OrderHistoryLine key={order.id} order={order}/>
                )
            }): <p>No order history</p>
          }
        </div>
      );
    };

export default MyAccount;