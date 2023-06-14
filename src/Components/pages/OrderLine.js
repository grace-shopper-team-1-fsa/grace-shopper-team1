import React from 'react';
import { Link } from 'react-router-dom';

const OrderLine = (props) => {
    const {order} = props;
    console.log(order)

    return(
        <Link to={`/order/${order.id}`}>
        
         <div className='orderRow'>
            <div className='orderCell'>
                <p>Confirmation Number: {order.id}</p>
            </div>
            <div className='orderCell'>
                <p>Date: {order.updatedAt}</p>
            </div>
            <div className='orderCell'>
                <p>${order.total.toFixed(2)}</p>
            </div>
        </div>
        </Link>
    )
}

export default OrderLine;