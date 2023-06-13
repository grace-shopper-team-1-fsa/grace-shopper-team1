import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PastOrder = () => {
    const {id} = useParams();
    const order = useSelector(state=>state.orders).find(order=>order.id===id);
    const product = useSelector(state=>state.products)
    
    return(
        <div>
            <p>Order Details</p>
            {
                order.lineItems.map(lineItem=>{
                    return(
                        <div className='lineDetail' key={lineItem.product.id}>
                            <div className='lineImg'>
                                <img src={window.location.origin + `${lineItem.product.image}`} width="200" height="150" alt="Image"/>
                            </div>
                            <div className='lineDescription'>
                                <p>{lineItem.product.name}</p>
                            </div>
                            <div className='linePrice'>
                                <p>Price</p>
                                <p>{lineItem.product.price}</p>
                            </div>
                            <div className='lineQty'>
                                <p>Qty</p>
                                <p>{lineItem.quantity} </p> 
                            </div>  
                        </div>
                    )
                })
            }
        </div>    
    )
}

export default PastOrder;