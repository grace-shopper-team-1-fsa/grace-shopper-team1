import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../store/productsSlice';
import { fetchAllReviews } from '../../store/reviewSlice';
import { addItem } from '../../store/cart';
import {ReviewForm} from './';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => state.products.find((product) => product.id === id));
  const reviews = useSelector((state) => state.reviews.reviewsList.filter((review) => review.productId === id));
  const {auth} = useSelector(state => state);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchAllReviews());
  }, [dispatch, id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleClick = () => {
    if(auth.id){
      dispatch(addItem({
        product: product, 
        quantity : quantity
      }))
    } else {

      console.log('did not dispatch')
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
              <ReviewForm id={id}/>
            </div>
          ))}
        </div>
        <button className="add-to-cart" onClick={handleClick}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;