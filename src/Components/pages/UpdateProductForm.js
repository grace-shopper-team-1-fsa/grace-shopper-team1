import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateProduct } from '../../store';
import { useDispatch } from 'react-redux';

const UpdateProductForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [rating, setRating] = useState();
    const [imgUrl, setImgUrl] = useState('');

    const handleProductNameChange = (e) => setProductName(e.target.value);
    const handlePriceChange = (e) => setProductPrice(e.target.value);
    const handleRatingChange = (e) => setRating(e.target.value);
    const handleImgUrlChange = (e) => setImgUrl(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProductData = {
            id: id,
            name: productName,
            price: productPrice,
            rating: rating,
            imgUrl: imgUrl
        }
       // dispatch(updateProduct(updatedProductData))
    }
    

    return (
        <div>
            <h3>Update Product Information</h3>
            <form>
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
                    id="name"
                    name="name"
                    value={productName}            
                    onChange={handleProductNameChange}
                />

            </form>
        </div>
    );
}

export default UpdateProductForm;