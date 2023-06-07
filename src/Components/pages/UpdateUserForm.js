import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, updateUserProfile } from '../../store';


const UpdateUserForm = () =>{
    const { id } = useParams();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.usersList)
    const user = users.find((user) => user.id === id);
    console.log(user)

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userHomeAddress, setUserHomeAddress] = useState('');
    const [userShippingAddress, setUserShippingAddress] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userPassword, setUserPassword] = useState('');

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
            id: id,
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
    }

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
        
      </div>
    );
}

export default UpdateUserForm;