import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllUsers } from '../../store';


const MyAccount = () =>{

    const dispatch = useDispatch();
    const userAuthObj = useSelector(state => state.auth);
    const user = useSelector(state=>state.users.usersList.find(e=>e.id === userAuthObj.id));

    console.log("User info after Auth", user)

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
          <Link to={`/myaccount/updateuserinfo`}>
            <h3>Update your information</h3>
          </Link>
        </div>
      );
    };

export default MyAccount;