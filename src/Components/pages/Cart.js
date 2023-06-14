import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, fetchProducts } from '../../store';
import {useNavigate} from 'react-router-dom';
import {LineItem} from './';
import {CartSummary} from './';
import ReactModal from 'react-modal';
import LoginRegister from './LoginRegister';


const Cart = () =>{
    const {auth} = useSelector(state=>state);
    let guest = false;
    let cart = useSelector(state=>state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toggleOpen, setToggleOpen] = useState(false);

    useEffect(()=>{
        if(auth.id){
            dispatch(fetchCart());
        }
        dispatch(fetchProducts());
    }, [dispatch]);

    if(!auth.id){
        cart = JSON.parse(window.localStorage.getItem('cart'));
        cart.total = 0;
        cart.lineItems.forEach(e=> {
            cart.total += e.product.price*e.quantity
        });
        window.localStorage.setItem('cart', JSON.stringify(cart));
        guest = true;
    }
   

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
                        <ReactModal isOpen={toggleOpen} ariaHideApp={false}>
                            <LoginRegister onLoginFromRegister={handleLoginFromCheckout} /> 
                        </ReactModal>
                    </div>
                )
            }
        </div>
  );
        
}
export default Cart;