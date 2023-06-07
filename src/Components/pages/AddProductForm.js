import React, { useState } from 'react';
import { addProduct } from '../../store';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'


function AddProductForm() {

    const dispatch = useDispatch();

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImgUrl, setProductImgUrl] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productRating, setProductRating] = useState(0);

    const handleProductNameChange = (e) => setProductName(e.target.value);
    const handlePriceChange = (e) => setProductPrice(e.target.value);
    const handleRatingChange = (e) => setProductRating(e.target.value);
    const handleImgUrlChange = (e) => setProductImgUrl(e.target.value);
    const handleDescriptionChange = (e) => setProductDescription(e.target.value)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newProductData = {
            name: productName,
            price: productPrice,
            rating: productRating,
            image: productImgUrl,
            description: productDescription
        }
       dispatch(addProduct(newProductData));
       setProductName('')
       setProductPrice()
       setProductRating()
       setProductImgUrl('')
       setProductDescription('')
    }


    return (
        <div>
            <Link to="/admin">
                <p>back to admin dashboard</p>
            </Link>
            <h3>Update Product Information</h3>
            <form onSubmit={handleSubmit}>
                <label>Product Name</label>
                <input 
                    name="name"
                    value={productName}            
                    onChange={handleProductNameChange}
                />
                <label>Product Price</label>
                <input 
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

export default AddProductForm;