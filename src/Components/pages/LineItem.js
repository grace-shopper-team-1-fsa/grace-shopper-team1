import React,{useState} from 'react';
import ReactModal from 'react-modal';
import UpdateProduct from './UpdateProduct';

const LineItem = (props) => {
    const {lineItem, product} = props;
    const [open, setOpen] = useState(false);
    return(
        <div className='line'>
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
                    <p>{lineItem.quantity}</p>
                </div>  
            </div>
            <div className='lineModify'>
                <button onClick={setOpen}>Edit</button>
                <ReactModal isOpen={open} contentLabel="Update product page" ariaHideApp={false}>
                    <UpdateProduct product={product} lineItem={lineItem}/>
                    <button onClick={()=>setOpen(false)}>CANCEL</button>
                </ReactModal>
                <button>Save For Later</button>
                <button>Remove</button>
            </div>  
        </div>
    )
}

export default LineItem;