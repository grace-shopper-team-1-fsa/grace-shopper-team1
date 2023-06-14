import React from 'react';

const CartSummary = (props) => {
    const {total} = props;

    return(
    <div className='summary'>
        <p className='summary-title'>Summary</p>
        <div>
            <div className='summaryRow'>
                <p>Items: </p>
                <p>${total.toFixed(2)}</p>
            </div>
            <div className='totalRow'>
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
            </div>
        </div>    
    </div>
    )
}

export default CartSummary;