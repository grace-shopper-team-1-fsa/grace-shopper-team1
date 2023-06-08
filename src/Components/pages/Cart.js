import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, fetchProducts } from '../../store';
import {useNavigate} from 'react-router-dom';
import {LineItem} from './';
import {CartSummary} from './';

const Cart = () =>{
    const cart = useSelector(state => state.cart);
    const products = useSelector(state => state.products);
    let cartProducts = [];
    cart.lineItems.forEach(e=>cartProducts.push(products.find(product=>product.id ==e.productId)));
    console.log(cartProducts)
    const total = cartProducts.reduce((total, current)=>total+Number(current.price), 0);
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
            <CartSummary total={total}/>
            <button onClick={handleClick}>Continue to Checkout</button>
        </div>
  );
        
}
export default Cart;