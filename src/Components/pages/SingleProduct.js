import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById } from '../../store/productsSlice';

const SingleProduct = ({ productId }) => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);
  

  
  const products = useSelector(state => state.products);

  
  const product = products.find(product => product.id === productId);

  
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-page">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-name">
        <h1>{product.name}</h1>
      </div>
      <div className="product-description">
        <p>{product.description}</p>
      </div>
      <div className="product-price">
        <p>Price: ${product.price.toFixed(2)}</p>
      </div>
      <div className="product-rating">
        <p>Rating: {product.rating} / 5</p>
      </div>
    </div>
  );
};

export default SingleProduct;