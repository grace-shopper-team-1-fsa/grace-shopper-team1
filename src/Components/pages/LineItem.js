import React from 'react';

const LineItem = (props) => {
    const {lineItem, product} = props;
    return(
        <div>
            <div>
                <img src={window.location.origin + `${product.img}`}/>
            </div>
            <div>
                <p>{product.name}</p>
            </div>
            <div>
                <p>Price</p>
                <p>{product.price}</p>
            </div>    
        </div>
    )
}

export default LineItem;