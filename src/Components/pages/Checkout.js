import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllUsers, updateIsCart } from '../../store';

const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const globalstate = useSelector(state => state)
    console.log("CURRENT GLOBAL STATE", globalstate)
    const user = useSelector(state => state.auth)
    console.log("CURRENT USER STATE", user)
    const cart = useSelector(state => state.cart)
    console.log('CURRENT Cart', cart)

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userHomeAddress, setUserHomeAddress] = useState('');
    //const [userShippingAddress, setUserShippingAddress] = useState(''); 
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');


    const handleFirstNameChange = (e) => setUserFirstName(e.target.value);
    const handleLastNameChange = (e) => setUserLastName(e.target.value);
    const handleEmailChange = (e) => setUserEmail(e.target.value);

    //Shipping
    const handleHomeAddressChange = (e) => setUserHomeAddress(e.target.value);
    const handleAddressLine1Change = (e) => setAddressLine1(e.target.value);
    const handleAddressLine2Change = (e) => setAddressLine2(e.target.value);
    const handleShippingAddressChange = (e) => setUserShippingAddress(e.target.value);
    const handleCityChange = (e) => setCity(e.target.value);
    const handleCountryChange = (e) => setCountry(e.target.value);
    const handleStateChange = (e) => setState(e.target.value);
    const handlePostalCodeChange = (e) => setPostalCode(e.target.value);

    useEffect(() => {
        dispatch(fetchAllUsers())
        
    }, [dispatch])

    const fullAddress = `${addressLine1}, ${addressLine2}, ${city}, ${state}, ${postalCode}, ${country}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('handled click')
        navigate('/myaccount')
        // dispatch(updateIsCart(
        //     {
        //         id: user.id,
        //         isCart: false
        //     }
        // ))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Email<span style={{ color: 'red' }}>*</span></label>
            <input 
                name="email"
                value={userEmail}            
                onChange={handleEmailChange}
                placeholder={`${user.email}`}
                required
            />
            <label>First Name</label>
            <input 
                name="firstName"
                value={userFirstName}            
                onChange={handleFirstNameChange}
                placeholder={`${user.firstName}`}
                
            />
            <label>Last Name</label>
            <input 
                name="lastName"
                value={userLastName}            
                onChange={handleLastNameChange}
                placeholder={`${user.lastName}`}
                
            />
            <h3>Shipping</h3>
             <label>Address Line 1</label>
            <input
                type="text"
                value={addressLine1}
                onChange={handleAddressLine1Change}
                
            />

            <label>Address Line 2</label>
            <input
                type="text"
                value={addressLine2}
                onChange={handleAddressLine2Change}
                placeholder='Apartment, Suite, Unit, Building, Floor'
                
            />

            <label>City</label>
            <input 
                type="text" 
                value={city} 
                onChange={handleCityChange} 
                
            />

            <label>Country</label>
            <input 
                type="text" 
                value={country} 
                onChange={handleCountryChange}
                
            />

            <label>State</label>
            <input 
                type="text" 
                value={state} 
                onChange={handleStateChange} 
                
            />

            <label>Postal Code</label>
            <input
                type="text"
                value={postalCode}
                onChange={handlePostalCodeChange}
                
            />
            <label>Card Number</label>
            <input 
                name="cardNumber"
                
            />
            <label>Expiration Date</label>
            <input 
                type="text"
                name="expiration"
                placeholder="MM/YY"
                
            />
            <label>Phone Number</label>
            <input 
                type="text"
                name="phonenumber"
                placeholder="555-555-5555"
                
            />
             <button type="submit">Confirm Order</button>
            </form>
        </div>
    );
};

export default Checkout;