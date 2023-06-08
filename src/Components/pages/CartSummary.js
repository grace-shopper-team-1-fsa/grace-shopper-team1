import React from 'react';

const CartSummary = (props) => {
    const itemsToCalc = props;

    console.log("FROM CART SUMMARY", itemsToCalc)

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