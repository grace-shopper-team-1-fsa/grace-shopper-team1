import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = (props) =>{
    const {product} = props;
    return(
        <Link to={`/product/${product.id}`}>
            <img src={window.location.origin + `${product.image}`} width="200" height="150" alt="Image"/>
            <p>{product.name}</p>
            <p>{product.price}</p>
        </Link>
    )
}

export default ProductCard;