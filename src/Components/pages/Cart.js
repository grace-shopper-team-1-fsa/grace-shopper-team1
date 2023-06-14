import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {LineItem} from './';
import {CartSummary} from './';
import ReactModal from 'react-modal';
import LoginRegister from './LoginRegister';


const Cart = () =>{
    const {auth} = useSelector(state=>state);
    const cart = useSelector(state=>state.cart);
    console.log(cart);
    const navigate = useNavigate();
    const [toggleOpen, setToggleOpen] = useState(false);
   
    const handleClick = () =>{
        navigate('/checkout');
    }

    const handleLoginFromCheckout = () => {
        setToggleOpen(false);
        navigate('/checkout');
    }

    return (
        <div>
            <div className='basket'>
                <h2 className='shopping-cart-header'>Shopping Cart</h2>
                { cart.lineItems.length > 0 ?
                    cart.lineItems.map((lineItem, idx)=> (
                        <div key={idx} >
                            <LineItem key={lineItem.id} lineItem={lineItem}/>
                        </div>
                        )   
                    )
                : <p className='cart-is-empty'>Cart is Empty</p>}
            </div>
            <CartSummary total={cart.total}/>
            { auth.id ? (
                <button className='to-checkout-button' onClick={handleClick}>
                    Continue to Checkout
                </button>
                ) : (
                    <div>
                        <button className='to-checkout-button' onClick={() => setToggleOpen(true)}>Please Login to Continue</button>
                        <ReactModal 
                            isOpen={toggleOpen}
                            ariaHideApp={false}>
                            <LoginRegister onLoginFromRegister={handleLoginFromCheckout} /> 
                        </ReactModal>
                    </div>
                )
            }
        </div>
  );
        
}
export default Cart;