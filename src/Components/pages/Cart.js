import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, fetchProducts } from '../../store';
import {LineItem} from './';

const Cart = () =>{
    const cart = useSelector(state => state.cart);
    console.log(cart);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchCart());
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <h1>Cart</h1>
            {
                cart.lineItems.map(lineItem=>{
                    const product = products.find(product => product.id === lineItem.productId);
                    return <LineItem key={lineItem.id} lineItem={lineItem} product={product}/>
                })
            }
        </div>
  );
        
}
export default Cart;