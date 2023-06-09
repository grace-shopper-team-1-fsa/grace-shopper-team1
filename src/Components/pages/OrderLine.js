import React from 'react';

const OrderLine = (props) => {
    const {order} = props;

    return(
        <Link to={`/order/${order.id}`}>
         <div className='orderRow'>
            <div className='orderCell'>
                <p>{order.id}</p>
            </div>
            <div className='orderCell'>
                <p>{order.updatedAt}</p>
            </div>
            <div className='orderCell'>
                <p>{order.total}</p>
            </div>
        </div>
        </Link>
    )
}

export default OrderLine;