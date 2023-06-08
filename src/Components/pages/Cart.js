import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, fetchProducts } from '../../store';
import {useNavigate} from 'react-router-dom';
import {LineItem} from './';
import {CartSummary} from './';

const Cart = () =>{
    const cart = useSelector(state => state.cart);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(fetchCart());
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleClick = () =>{
        navigate('/checkout');
    }

    return (
        <div>
            <div className='basket'>
                <p>Shopping Basket</p>
                {
                    cart.lineItems.map(lineItem=>{
                        const product = products.find(product => product.id === lineItem.productId);
                        return <LineItem key={lineItem.id} lineItem={lineItem} product={product}/>
                    })
                }
            </div>
            <div className='summary'>
                <p>Summary</p>
                <div>
                    <p>Items: </p><p></p>
                </div>    
                <button onClick={handleClick}>Checkout</button>
            </div>
        </div>
  );
        
}
export default Cart;