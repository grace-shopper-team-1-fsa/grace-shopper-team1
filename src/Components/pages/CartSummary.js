import React from 'react';

const CartSummary = (props) => {
    const {total} = props;

    return(
    <div className='summary'>
        <p>Summary</p>
        <div>
            <div className='summaryRow'>
                <p>Items: </p>
                <p>${total}</p>
            </div>
            <div className='summaryRow totalRow'>
                <p>Total</p>
                <p>${total}</p>
            </div>
        </div>    
    </div>
    )
}

export default CartSummary;