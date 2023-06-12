import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { updateProduct, deleteProduct, fetchProductById } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

const UpdateProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.find((product) => product.id === id));

  const [productName, setProductName] = useState(product.name);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productImgUrl, setProductImgUrl] = useState(product.image);
  const [productDescription, setProductDescription] = useState(product.description);
  const [productRating, setProductRating] = useState(product.rating);

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handlePriceChange = (e) => setProductPrice(e.target.value);
  const handleRatingChange = (e) => setProductRating(e.target.value);
  const handleImgUrlChange = (e) => setProductImgUrl(e.target.value);
  const handleDescriptionChange = (e) => setProductDescription(e.target.value);

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
    <div>
      <Link to="/admin">
        <p>back to admin dashboard</p>
      </Link>
      <h2>Product Details</h2>
      {product ? (
        <div>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Description: {product.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

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
      <button onClick={() => handleDelete(id)}>Delete Product</button>
    </div>
  );
};

export default UpdateProductForm;