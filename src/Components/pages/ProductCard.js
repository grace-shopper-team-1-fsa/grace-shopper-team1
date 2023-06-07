import React from 'react';

const ProductCard = (props) =>{
    const {product} = props;
    return(
        <div>
            <img src={window.location.origin + `${product.image}`}/>
            <p>{product.name}</p>
            <p>{product.price}</p>
        </div>
    )
}

export default ProductCard;