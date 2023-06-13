import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { updateProduct, deleteProduct, fetchProductById } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

const UpdateProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.find((product) => product.id === id));

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImgUrl, setProductImgUrl] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productRating, setProductRating] = useState('');

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handlePriceChange = (e) => setProductPrice(e.target.value);
  const handleRatingChange = (e) => setProductRating(e.target.value);
  const handleImgUrlChange = (e) => setProductImgUrl(e.target.value);
  const handleDescriptionChange = (e) => setProductDescription(e.target.value);

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductPrice(product.price);
      setProductImgUrl(product.image);
      setProductDescription(product.description);
      setProductRating(product.rating);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProductData = {
      id: id,
      name: productName,
      price: productPrice,
      rating: productRating,
      image: productImgUrl,
      description: productDescription,
    };
    dispatch(updateProduct(updatedProductData));
    setProductDescription('');
    setProductImgUrl('');
    setProductImgUrl('');
    setProductName('');
    setProductPrice('');
    navigate('/admin');
  };

  const handleDelete = () => {
    dispatch(deleteProduct(id));
    navigate('/admin');
  };

  return (
    <div className="product-details-container">
      <Link to="/admin">
        <p>Back to Admin Dashboard</p>
      </Link>
      <div className="product-details">
        <h2>Product Details</h2>
        {product ? (
          <div>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p className="product-description">Description: {product.description}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <h3>Update Product Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productName}
            onChange={handleProductNameChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="price">Product Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={productPrice}
            onChange={handlePriceChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="rating">Product Rating</label>
          <input
            type="text"
            id="rating"
            name="rating"
            value={productRating}
            onChange={handleRatingChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            name="description"
            value={productDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="imgUrl">Product Image Url</label>
          <input
            type="text"
            id="imgUrl"
            name="imgUrl"
            value={productImgUrl}
            onChange={handleImgUrlChange}
          />
        </div>
        <button type="submit">Submit Changes</button>
      </form>
      <button onClick={handleDelete}>Delete Product</button>
    </div>
  );
};

export default UpdateProductForm;