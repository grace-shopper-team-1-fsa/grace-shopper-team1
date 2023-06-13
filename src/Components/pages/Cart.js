import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, fetchProducts } from '../../store';
import {useNavigate} from 'react-router-dom';
import {LineItem} from './';
import {CartSummary} from './';

const Cart = () =>{
    const {auth} = useSelector(state=>state);
    let guest = true;
    let cart = {};
    if(auth.id){
        cart = useSelector(state => state.cart);
        guest = false;
    } else {
        cart = JSON.parse(window.localStorage.getItem('cart'));
        cart.total = 0;
        cart.lineItems.forEach(e=> {
            console.log(e.product.price + ' ' + e.quantity);
            console.log(cart.total);
            cart.total += e.product.price*e.quantity
        });
        console.log(cart.total);
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(auth.id){
            dispatch(fetchCart());
        }
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleClick = () =>{
        navigate('/checkout');
    }

    return (
        <div>
            <div className='basket'>
                <h2 className='shopping-cart-header'>Shopping Cart</h2>
                { cart.lineItems.length > 0 ?
                    cart.lineItems.map(lineItem=>{
                        return <LineItem key={lineItem.id} guest={guest} lineItem={lineItem} product={lineItem.product}/>
                    })
                : <p className='cart-is-empty'>Cart is Empty</p>}
            </div>
            <CartSummary total={cart.total}/>
            <button className='to-checkout-button' onClick={handleClick}>Continue to Checkout</button>
        </div>
  );
        
}
export default Cart;