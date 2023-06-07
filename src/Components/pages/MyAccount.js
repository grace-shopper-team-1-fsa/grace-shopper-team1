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
          <Link to={`/myaccount/${id}/updateuserinfo`}>
            <h3>Update your information</h3>
          </Link>
        </div>
      );
    };

export default MyAccount;