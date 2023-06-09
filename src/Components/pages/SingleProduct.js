import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../store/productsSlice';
import { fetchAllReviewsAsync } from '../../store/reviewSlice';
import { addItem } from '../../store/cart';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => state.products.find((product) => product.id === id));
  const reviews = useSelector((state) => state.reviews.reviewsList.filter((review) => review.productId === id));

  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchAllReviewsAsync());
  }, [dispatch, id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleClick = () => {
    dispatch(addItem({
      product: product, 
      quantity : 1
    }))
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
      </div>
    </div>
  );
};

export default SingleProduct;