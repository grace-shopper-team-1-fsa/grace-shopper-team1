import React from 'react';



const CartSummary = (props) => {
    const itemsToCalc = props;
    let itemTotal = 0

    Object.keys(itemsToCalc).forEach(item => {
        const lineItems = itemsToCalc[item];
        lineItems.forEach(obj => {
            itemTotal += obj.quantity * obj.product.price;       
        })
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
                        <p>Subtotal: {item.quantity * item.product.price}</p>
                    </div>)
            })
        }
        </div>
            <p>Total: {itemTotal}</p>
    </div>
    )
}

export default CartSummary;