import React from 'react';

const OrderHistoryLine = (props) => {
    const {order} = props;

    return(
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
    )
}

export default OrderHistoryLine;