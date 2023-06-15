import React,{useState} from 'react';
import ReactModal from 'react-modal';
import UpdateProduct from './UpdateProduct';
import { removeItem, addItem } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LineItem = (props) => {
    const {lineItem} = props;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const deleteItem = () => {
        const payload={product: lineItem.product, quantityToRemove: lineItem.quantity};
        dispatch(removeItem(payload));
        navigate('/cart');
    }

    const updateQuantity=(ev)=>{
        ev.preventDefault();
        const quantityDiff = Number(ev.target.value) - lineItem.quantity;
            if(quantityDiff < 0){
                const payload = {product: lineItem.product, quantityToRemove: Math.abs(quantityDiff)};
                dispatch(removeItem(payload));
            } else{
                const payload = {product: lineItem.product, quantity: quantityDiff};
                dispatch(addItem(payload));
            }
        setOpen(false);
    }

    return(
        <div className='line'>
            <div className='lineDetail'>
                <div className='lineImg'>
                    <img className="line-item-image" src={window.location.origin + `${lineItem.product.image}`} alt="Image"/>
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
                    <input type="number" defaultValue={lineItem.quantity} min="0" max="10" onChange={updateQuantity}/>
                </div>  
            </div>
            <div className='lineModify'>
                <button className="line-modify-button" onClick={setOpen}>Edit</button>
                <ReactModal isOpen={open} contentLabel="Update product page" ariaHideApp={false}>
                    <UpdateProduct lineItem={lineItem} updateQuantity={updateQuantity}/>
                    <button onClick={()=>setOpen(false)}>CANCEL</button>
                </ReactModal>
                <button className="line-modify-button">Save For Later</button>
                <button className="line-modify-button" onClick={deleteItem}>Remove</button>
            </div>  
        </div>
    )
}

export default LineItem;