import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PastOrder = () => {
    const {id} = useParams();
    const order = useSelector(state=>state.orders).find(order=>order.id===id);
    
    return(
        <div>
            <p>Order Details</p>
        </div>    
    )
}

export default PastOrder;