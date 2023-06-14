import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, createOrder } from '../../store';
import CartSummary from './CartSummary';
import CartSummaryTotals from './CartSummaryTotals';

const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const globalstate = useSelector(state => state)
    const user = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart)
    const lineItems = useSelector(state => state.cart.lineItems)

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userHomeAddress, setUserHomeAddress] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');

    const handleFirstNameChange = (e) => setUserFirstName(e.target.value);
    const handleLastNameChange = (e) => setUserLastName(e.target.value);
    const handleEmailChange = (e) => setUserEmail(e.target.value);
    const handlePhoneNumberChange = (e) => setUserPhoneNumber(e.target.value);

    //Shipping
    const handleHomeAddressChange = (e) => setUserHomeAddress(e.target.value);
    const handleAddressLine1Change = (e) => setAddressLine1(e.target.value);
    const handleAddressLine2Change = (e) => setAddressLine2(e.target.value);
    const handleShippingAddressChange = (e) => setUserShippingAddress(e.target.value);
    const handleCityChange = (e) => setCity(e.target.value);
    const handleCountryChange = (e) => setCountry(e.target.value);
    const handleStateChange = (e) => setState(e.target.value);
    const handlePostalCodeChange = (e) => setPostalCode(e.target.value);

    // useEffect(() => {
    //     dispatch(fetchAllUsers())   
    // }, [dispatch])

    const fullAddress = `${addressLine1}, ${addressLine2}, ${city}, ${state}, ${postalCode}, ${country}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(true)
    }
    const closeModalAndSubmit = (e) => {
        e.preventDefault();
        dispatch(createOrder());
        setOpen(false);
        navigate('/');
        window.location.reload();
    }

    return (
        <div className="checkout-form-container" >
            <form onSubmit={handleSubmit}>
                <div className="checkout-group-general">
                    <h4>Email<span style={{ color: 'red' }}>*</span></h4>
                    <input  
                        name="email" 
                        value={userEmail} 
                        onChange={handleEmailChange}
                        placeholder={`${user.email}`}
                        required 
                />
                </div>
                <div className="checkout-group-shipping">
                    <h4>Shipping</h4>
                    <input 
                        
                        name="firstName" 
                        value={userFirstName} 
                        onChange={handleFirstNameChange}
                        placeholder={"First Name"} 
                    />        
                    <input
                        name="lastName" 
                        value={userLastName} 
                        onChange={handleLastNameChange}
                        placeholder={"Last Name"} 
                    />   
                    <input  
                        value={addressLine1}
                        onChange={handleAddressLine1Change} 
                        placeholder="Addres Line 1"
                    />
                    
                    <input  
                        value={addressLine2}
                        onChange={handleAddressLine2Change}
                        placeholder='Address Line 2: Apartment, Suite, Unit, Building, Floor' 
                    />
                    <input  
                        value={city} 
                        onChange={handleCityChange} 
                        placeholder="City"
                    />
                    
                    <input  
                        value={state}  
                        onChange={handleStateChange} 
                        placeholder="State"
                    />
                    
                    <input  
                        value={postalCode} 
                        onChange={handlePostalCodeChange}  
                        placeholder="Postal Code"
                    />
                    
                    <input   
                        value={country} 
                        onChange={handleCountryChange}  
                        placeholder="Country"
                    />
                </div>
                <div className="checkout-group-cc">
                    <label>Card Number</label>
                    <input  name="cardNumber" />
                    <label>Expiration Date</label>
                    <input type="text" name="expiration" placeholder="MM/YY"/>
                </div>
                <div className="checkout-group-phone">
                    <label>Phone Number</label>
                    <input type="text" name="phonenumber" value={userPhoneNumber}onChange={handlePhoneNumberChange} placeholder="555-555-5555"/>
                </div>
                <button type="submit" >Confirm Order</button>
            </form>
            <div className='lineModify'>
                <ReactModal 
                isOpen={open} 
                // contentLabel="" 
                ariaHideApp={false}>
                    {/* <CartSummary items={lineItems}/> */}
                    <CartSummaryTotals items={lineItems}/>
                    <h3>Confirm Details</h3>
                    <p>Name: {userFirstName} {userLastName}</p>
                    <p>Email: {userEmail}</p>
                    <p>Address: </p>
                    <p>{addressLine1}</p>
                    <p>{addressLine2}</p>
                    <p>{city}, {state}, {postalCode}</p>
                    <p>Phone Number: {userPhoneNumber}</p>
                    <button onClick={()=>setOpen(false)}>CANCEL</button>
                    <button onClick={closeModalAndSubmit}>Confirm</button>
                </ReactModal>
            </div>
        </div>
    );
};

export default Checkout;