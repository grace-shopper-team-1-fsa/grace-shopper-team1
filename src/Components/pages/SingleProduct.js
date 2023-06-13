import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../store/productsSlice';
import { fetchAllReviews } from '../../store/reviewSlice';
import { addItem } from '../../store/cart';
import {ReviewForm} from './';
import ReactModal from 'react-modal';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.products.find((product) => product.id === id));
  const reviews = useSelector((state) => state.reviews.reviewsList.filter((review) => review.productId === id));
  const {auth} = useSelector(state => state);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchAllReviews());
    setOpen(false);
  }, [dispatch, id]);
  
  if (!product) {
    return <p>Loading...</p>;
  }

  const handleClick = () => {
    if(auth.id){
      console.log('reaching this')
      dispatch(addItem({
        product: product, 
        quantity : quantity
      }))
    } else {
      const cart = JSON.parse(window.localStorage.getItem('cart'));
      cart.lineItems.push({product:product, quantity: quantity, productId: product.id});
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  return (
    <div className="product-page">
      <div className="product-page-box">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
      </div>

      <div className="product-page-box">
        <div className="product-name">
          <h1>{product.name}</h1>
        </div>
        <div className="product-description">
          <p>{product.description}</p>
        </div>
        <div className="product-price">
          <p>Price: ${product.price}</p>
        </div>
        <div className="product-quantity">
        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
        <div className="product-rating">
          <p>Rating: {product.rating} / 5</p>
        </div>
        <div className="product-reviews">
          {reviews.map((review) => (
            console.log(review),
            <div key={review.id}>
              <h3>{review.name}</h3>
              <p>Rating: {review.rating} / 5</p>
              <p>{review.description}</p>
        </div>
          ))}
        </div>
        <button className="add-to-cart" onClick={handleClick}>Add to Cart</button>
        <button onClick={() => setOpen(true)}>Write a review!</button>    
        <ReactModal isOpen={open}>
          <ReviewForm open={open} />
          <button onClick={() => setOpen(false)}>Cancel</button>
        </ReactModal>
      </div>
        
    </div>
  );
};

export default SingleProduct;