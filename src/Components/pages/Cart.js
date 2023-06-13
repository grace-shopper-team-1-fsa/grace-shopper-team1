import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, fetchProducts } from '../../store';
import { useNavigate } from 'react-router-dom';
import { LineItem, CartSummary } from './';

const AuthenticatedCart = () => {
  const cart = useSelector(state => state.cart);
  const guest = false;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <div className='basket'>
        <h2 className='shopping-cart-header'>Shopping Cart</h2>
        {cart.lineItems.length > 0 ? (
          cart.lineItems.map(lineItem => (
            <LineItem key={lineItem.id} guest={guest} lineItem={lineItem} product={lineItem.product} />
          ))
        ) : (
          <p className='cart-is-empty'>Cart is Empty</p>
        )}
      </div>
      <CartSummary total={cart.total} />
      <button className='to-checkout-button' onClick={handleClick}>
        Continue to Checkout
      </button>
    </div>
  );
};

const GuestCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartFromLocalStorage = JSON.parse(window.localStorage.getItem('cart'));
  let cart = { lineItems: [], total: 0 };
  const guest = true;

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (cartFromLocalStorage) {
    cart = { ...cartFromLocalStorage, total: 0 };
    cart.lineItems.forEach(e => {
      console.log(e.product.price + ' ' + e.quantity);
      console.log(cart.total);
      cart.total += e.product.price * e.quantity;
    });
    console.log(cart.total);
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }

  const handleClick = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <div className='basket'>
        <h2 className='shopping-cart-header'>Shopping Cart</h2>
        {cart.lineItems.length > 0 ? (
          cart.lineItems.map(lineItem => (
            <LineItem key={lineItem.id} guest={guest} lineItem={lineItem} product={lineItem.product} />
          ))
        ) : (
          <p className='cart-is-empty'>Cart is Empty</p>
        )}
      </div>
      <CartSummary total={cart.total} />
      <button className='to-checkout-button' onClick={handleClick}>
        Continue to Checkout
      </button>
    </div>
  );
};

const Cart = () => {
  const { auth } = useSelector(state => state);

  if (auth.id) {
    return <AuthenticatedCart />;
  } else {
    return <GuestCart />;
  }
};

export default Cart;