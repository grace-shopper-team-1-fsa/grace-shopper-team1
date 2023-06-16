import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addItem } from '../../store/cart';
import { ReviewForm } from './';
import ReactModal from 'react-modal';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => state.products.find((product) => product.id === id));
  const reviews = useSelector((state) =>
    state.reviews.reviewsList.filter((review) => review.productId === id)
  );
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [dispatch, id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleClick = () => {
      dispatch(
        addItem({
          product: product,
          quantity: Number(quantity),
        })
      );
  };

  return (
    <div className="product-page">
      <Link to="/" className="back-link">
        Back to Vases
      </Link>
      <div className='product-page-section'>
        <div className="product-page-box">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="product-page-box">
          <div className="product-name">
            <h1>{product.name}</h1>
          </div>
          <div className="product-price">
            <p>Price: ${product.price}</p>
          </div>
          <div className="product-description">
            <p>{product.description}</p>
          </div>
          <div className="product-quantity">
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.abs(e.target.value))}/>
          </div>
          <div className="product-rating">
            <p>Rating: {product.rating} / 5</p>
          </div>
          <div className="product-reviews">
            <h2>Reviews</h2>
            {
              reviews.length === 0 ? (
                <p>No reviews yet</p>
              ) : (
                reviews.map((review) => (
                  <div className="product-review" key={review.id}>
                   <h3>{review.name}</h3>
                    <h5>Rating: {review.rating} / 5</h5>
                    <p>{review.description}</p>
                  </div>
                ))
              )
            }
          </div>
          <button className="add-to-cart" onClick={handleClick}>
            Add to Cart
          </button>
          <button onClick={() => setOpen(true)}>Write a review!</button>
          <ReactModal 
            isOpen={open}
            ariaHideApp={false}
            overlayClassName="review-modal-overlay"
            className="review-modal-content"
          >
            <ReviewForm open={open} />
            <button onClick={() => setOpen(false)}>Cancel</button>
          </ReactModal>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;