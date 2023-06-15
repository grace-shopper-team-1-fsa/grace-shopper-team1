import React from 'react';

const CartSummaryTotals = (props) => {
    const itemsToCalc = props;
    let runningTotal = 0;
    itemsToCalc.items.map(item => {
        runningTotal += item.quantity * item.product.price;
    })

    return(
        <div className='cartsummary-container'>
            <p>Order Summary</p>
            <div className="cartsummary-items">
            {itemsToCalc.items.map(item => (
                <div className="cartsummary-item" key={item.id}>
                <div className="cartsummary-labels">
                    <p className="cartsummary-label">Product Name:</p>
                    <p className="cartsummary-label">Subtotal:</p>
                </div>
                <div className="cartsummary-details">
                    <p className="cartsummary-detail">{item.product.name} (×{item.quantity})</p>
                    <p className="cartsummary-detail">$ {item.quantity * item.product.price}</p>
                </div>
                </div>
            ))}
            <p className='cartsummary-detail-total'>Total: $ {runningTotal}</p>
            </div>
        </div>
    )
}

export default CartSummaryTotals;