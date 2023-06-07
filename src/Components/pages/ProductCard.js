import React from 'react';

const ProductCard = (props) =>{
    const {product} = props;
    return(
        <div>
            <img src={window.location.origin + `${product.image}`} width="200" height="150" alt="Image"/>
            <p>{product.name}</p>
            <p>{product.price}</p>
        </div>
    )
}

export default ProductCard;