import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../store/productsSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

const product = useSelector((state) => state.products.find((product) => product.id === id));

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
        <p>Price: ${product.price}</p>
      </div>
      <div className="product-rating">
        <p>Rating: {product.rating} / 5</p>
      </div>
    </div>
  );
};

export default SingleProduct;