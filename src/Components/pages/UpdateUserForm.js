import React, { useState , useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, updateUserProfile } from '../../store';


const UpdateUserForm = () =>{
    const dispatch = useDispatch();
    const userAuthObj = useSelector(state => state.auth)
    const user = useSelector(state=>state.users.usersList.find(e=>e.id === userAuthObj.id));
    const navigate = useNavigate();

    const [userFirstName, setUserFirstName] = useState(user.firstName);
    const [userLastName, setUserLastName] = useState(user.lastName);
    const [userEmail, setUserEmail] = useState(user.email);
    const [userHomeAddress, setUserHomeAddress] = useState(user.homeAddress);
    const [userShippingAddress, setUserShippingAddress] = useState(user.shipAddress);
    const [userAvatar, setUserAvatar] = useState(user.avatar);
    const [userPassword, setUserPassword] = useState(user.password);

    const handleFirstNameChange = (e) => setUserFirstName(e.target.value);
    const handleLastNameChange = (e) => setUserLastName(e.target.value);
    const handleEmailChange = (e) => setUserEmail(e.target.value);
    const handleHomeAddressChange = (e) => setUserHomeAddress(e.target.value);
    const handleShippingAddressChange = (e) => setUserShippingAddress(e.target.value);
    const handleAvatarChange = (e) => setUserAvatar(e.target.value);
    const handlePasswordChange = (e) => setUserPassword(e.target.value);

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUserData = {
            id: user.id,
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            password: userPassword,
            homeAddress: userHomeAddress,
            shipAddress: userShippingAddress,
            avatar: userAvatar,
        }
        dispatch(updateUserProfile(updatedUserData))
        setUserFirstName('')
        setUserLastName('')
        setUserEmail('')
        setUserHomeAddress('')
        setUserShippingAddress('')
        setUserAvatar('')
        setUserPassword('')
        navigate('/myaccount')
    }

    return (
        <div>
        <Link to={`/myaccount`}>
                <p>back to your dashboard</p>
            </Link>
        {user && (
          <div>
            <p>Full Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Home Address: {user.homeAddress}</p>
            <p>Shipping Address: {user.shippingAddress}</p>
            <p>Avatar: {user.avatar}</p>
          </div>
        )}
        <h2>Update Information</h2>
        <form onSubmit={handleSubmit}>
        <label>First Name</label>
            <input 
                name="firstName"
                value={userFirstName}            
                onChange={handleFirstNameChange}
            />
            <label>Last Name</label>
            <input 
                name="lastName"
                value={userLastName}            
                onChange={handleLastNameChange}
            />
            <label>Email</label>
            <input 
                name="email"
                value={userEmail}            
                onChange={handleEmailChange}
            />
            <label>Password</label>
            <input 
                name="password"
                value={userPassword}            
                onChange={handlePasswordChange}
            />
            <label>Home Address</label>
            <input 
                name="homeAddress"
                value={userHomeAddress}            
                onChange={handleHomeAddressChange}
            />
            <label>Shipping Address</label>
            <input 
                name="shipAddress"
                value={userShippingAddress}            
                onChange={handleShippingAddressChange}
            />
            <label>Avatar</label>
            <input 
                name="avatar"
                value={userAvatar}            
                onChange={handleAvatarChange}
            />
             <button type="submit">Submit Changes</button>
        </form>
        <Link to={`/myaccount`}>
                <p>back to your dashboard</p>
            </Link>
      </div>
    );
}

export default UpdateUserForm;