import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchAllUsers } from '../../store';


const MyAccount = () =>{

    const { id } = useParams();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.usersList)
    const user = users.find((user) => user.id === id);
    console.log(user)

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    return (
        <div>
          <h2>Users</h2>
          {user && (
            <div>
              <h3>Username: {user.username}</h3>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Home Address: {user.homeAddress}</p>
              <p>Shipping Address: {user.shippingAddress}</p>
              <p>Avatar: {user.avatar}</p>
            </div>
          )}
        </div>
      );
    };

export default MyAccount;