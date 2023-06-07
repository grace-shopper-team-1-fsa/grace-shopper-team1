import React from 'react';

const LineItem = (props) => {
    const {lineItem, product} = props;
    return(
        <div className='line'>
            <div className='lineDetail'>
                <div className='lineImg'>
                    <img src={window.location.origin + `${product.image}`}/>
                </div>
                <div className='lineDescription'>
                    <p>{product.name}</p>
                </div>
                <div className='linePrice'>
                    <p>Price</p>
                    <p>{product.price}</p>
                </div>
                <div className='lineQty'>
                    <p>Qty</p>
                    <p>{lineItem.quantity}</p>
                </div>  
            </div>
            <div className='lineModify'>
                <button>Edit</button>
                <button>Save For Later</button>
                <button>Remove</button>
            </div>  
        </div>
    )
}

export default LineItem;