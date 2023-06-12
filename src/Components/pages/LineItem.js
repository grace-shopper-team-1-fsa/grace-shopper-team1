import React,{useState} from 'react';
import ReactModal from 'react-modal';
import UpdateProduct from './UpdateProduct';
import { removeItem, addItem } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LineItem = (props) => {
    const {product, guest} = props;
    let {lineItem} = props;
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteItem = () => {
        if(!guest){
            const payload={product: product, quantity: lineItem.quantity};
            dispatch(removeItem(payload));
        } else {
            const cart = JSON.parse(window.localStorage.getItem('cart'));
            cart.lineItems = cart.lineItems.filter(e=> product.id !== e.product.id);
            window.localStorage.setItem('cart', JSON.stringify(cart));
        }
        navigate('/cart');
    }

    const updateQuantity=(ev)=>{
        ev.preventDefault();
        if(!guest){
        const quantityDiff = ev.target.value - lineItem.quantity;
        if(quantityDiff < 0){
            const payload = {product: product, quantityToRemove: Math.abs(quantityDiff)};
            dispatch(removeItem(payload));
        } else{
            const payload = {product: product, quantity: quantityDiff};
            dispatch(addItem(payload));
        }
    } else {
        if(ev.target.value == 0){
            deleteItem();
        }

        lineItem.quantity = Number(ev.target.value);
        const cart = JSON.parse(window.localStorage.getItem('cart'));
        const modifyItem = cart.lineItems.find(e=> product.id === e.product.id);
        modifyItem.quantity = Number(ev.target.value);
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }
        setOpen(false);
        //navigate('/cart');
    }

    return(
        <div className='line'>
            <div className='lineDetail'>
                <div className='lineImg'>
                    <img className="line-item-image" src={window.location.origin + `${product.image}`} alt="Image"/>
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
                    <input type="number" defaultValue={lineItem.quantity} min="0" max="10" onChange={updateQuantity}/>
                </div>  
            </div>
            <div className='lineModify'>
                <button className="line-modify-button" onClick={setOpen}>Edit</button>
                <ReactModal isOpen={open} contentLabel="Update product page" ariaHideApp={false}>
                    <UpdateProduct product={product} lineItem={lineItem} updateQuantity={updateQuantity}/>
                    <button onClick={()=>setOpen(false)}>CANCEL</button>
                </ReactModal>
                <button className="line-modify-button">Save For Later</button>
                <button className="line-modify-button" onClick={deleteItem}>Remove</button>
            </div>  
        </div>
    )
}

export default LineItem;