import React from 'react';

const CartSummaryTotals = (props) => {
    const itemsToCalc = props;
    let itemTotal = 0
    let itemsArr = [];
    Object.keys(itemsToCalc).forEach(item => {
        const lineItems = itemsToCalc[item];
        itemsArr.push(lineItems)
        lineItems.forEach(obj => {
            itemTotal += obj.quantity * obj.product.price;       
        })
    })
    let runningTotal = 0;
    itemsToCalc.items.map(item => {
        runningTotal += item.quantity * item.product.price;
    })

    return(
    <div>
        <p>Summary</p>
        <div>
        {
            itemsToCalc.items.map(item => {
                return (
                    <div key={item.id}>
                        <p>Name: {item.product.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Subtotal: ${item.quantity * item.product.price}</p>
                    </div>)
            })
        }
        </div>
            <p>Total: {runningTotal}</p>
    </div>
    )
}

export default CartSummaryTotals;