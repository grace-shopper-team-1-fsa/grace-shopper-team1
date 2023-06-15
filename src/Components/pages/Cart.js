import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {LineItem} from './';
import {CartSummary} from './';
import ReactModal from 'react-modal';
import LoginRegister from './LoginRegister';
import { fetchCart } from '../../store';

const Cart = (props) =>{
    const {auth} = useSelector(state=>state);
    const {cart} = props;
    //const {cart} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                            <LineItem key={lineItem.id} guest={guest} lineItem={lineItem} product={lineItem.product}/>
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
                            overlayClassName="custom-overlay"
                            className="custom-content"
                            isOpen={toggleOpen}
                            ariaHideApp={false}>
                            <LoginRegister handleLoginFromCheckout={handleLoginFromCheckout} isCart={true}/> 
                        </ReactModal>
                    </div>
                )
            }
        </div>
  );
        
}
export default Cart;