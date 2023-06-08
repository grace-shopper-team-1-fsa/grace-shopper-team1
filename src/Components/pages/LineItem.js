import React,{useState} from 'react';
import ReactModal from 'react-modal';
import UpdateProduct from './UpdateProduct';
import { removeItem, addItem } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LineItem = (props) => {
    const {lineItem, product} = props;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteItem = () => {
        const payload={product: product, quantity: lineItem.quantity};
        dispatch(removeItem(payload));
        navigate('/cart');
        console.log(lineItem)
    }

    const updateQuantity=(ev)=>{
        ev.preventDefault();
        console.log("clicked arrow down", ev.target.value);
        const quantityDiff = ev.target.value - lineItem.quantity;
        console.log(quantityDiff)
        if(quantityDiff < 0){
            const payload = {product: product, quantityToRemove: Math.abs(quantityDiff)};
            console.log(payload)
            dispatch(removeItem(payload));
            //navigate('/cart') 
        } else{
            const payload = {product: product, quantity: quantityDiff};
            dispatch(addItem(payload));
        }
    }

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
                    <input type="number" value={lineItem.quantity} min="0" max="10" onChange={updateQuantity}/>
                </div>  
            </div>
            <div className='lineModify'>
                <button onClick={setOpen}>Edit</button>
                <ReactModal isOpen={open} contentLabel="Update product page" ariaHideApp={false}>
                    <UpdateProduct product={product} lineItem={lineItem}/>
                    <button onClick={()=>setOpen(false)}>CANCEL</button>
                </ReactModal>
                <button>Save For Later</button>
                <button onClick={deleteItem}>Remove</button>
            </div>  
        </div>
    )
}

export default LineItem;