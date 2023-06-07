import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateProduct } from '../../store';
import { useDispatch } from 'react-redux';

const UpdateProductForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImgUrl, setProductImgUrl] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productRating, setProductRating] = useState();

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
            imgUrl: productImgUrl,
            description: productDescription
        }
       dispatch(updateProduct(updatedProductData));
       setProductDescription('')
       setProductImgUrl('')
       setProductImgUrl('')
       setProductName('')
       setProductPrice('')
    }
    

    return (
        <div>
            <h3>Update Product Information</h3>
            <form onSubmit={handleSubmit}>
                <label>Product Name</label>
                <input 
                    type="text"
                    id="name"
                    name="name"
                    value={productName}            
                    onChange={handleProductNameChange}
                />
                <label>Product Price</label>
                <input 
                    type="text"
                    id="price"
                    name="price"
                    value={productPrice}            
                    onChange={handlePriceChange}
                />
                <label>Product Rating</label>
                <input 
                    name="rating"
                    value={productRating}            
                    onChange={handleRatingChange}
                />
                <label>Product Description</label>
                <input 
                    name="description"
                    value={productDescription}            
                    onChange={handleDescriptionChange}
                />
                <label>Product Image Url</label>
                <input 
                    name="imgUrl"
                    value={productImgUrl}            
                    onChange={handleImgUrlChange}
                />
                <button type="submit">Submit Changes</button>
            </form>
        </div>
    );
}

export default UpdateProductForm;