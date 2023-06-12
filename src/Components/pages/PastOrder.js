import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PastOrder = () => {
    const {id} = useParams();
    const order = useSelector(state=>state.orders).find(order=>order.id===id);
    
    return(
        <div>
            <p>Order Details</p>
            {
                order.lineItems.map(lineItem=>{
                    return(
                        <div className='lineDetail'>
                            <div className='lineImg'>
                                <img src={window.location.origin + `${product.image}`} width="200" height="150" alt="Image"/>
                            </div>
                            <div className='lineDescription'>
                                <p>{product.name}</p>
                            </div>
                            <div className='linePrice'>
                                <p>Price</p>
                                <p>{product.price}</p>
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