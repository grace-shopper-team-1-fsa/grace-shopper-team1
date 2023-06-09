import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = (props) =>{
    const {product} = props;
    return(
        <div className="productCard">
            <Link to={`/product/${product.id}`}>
                <div className="link">
                    <img className ="product-card-image" src={window.location.origin + `${product.image}`} width="200" height="150" alt="Image"/>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard;