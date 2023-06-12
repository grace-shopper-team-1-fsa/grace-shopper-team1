import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UpdateProduct = (props) => {
    const {product, lineItem, updateQuantity} = props;
    const tabs = ['options', 'details'];
    const [active, setActive] = useState(tabs[0]);
    const [quantity, setQuantity] = useState(lineItem.quantity);

    return(
        <div>
            <img src={window.location.origin + `${product.image}`} width="200" height="150" alt="Image"/>
            <div>
                <div>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <Link to={`/product/${product.id}`}>View Full Product Details</Link>
                </div>
            </div>
            <div>
                
                    <label>QTY:</label>
                    <input type="number" value={quantity} min="0" max="10" onChange={e=> setQuantity(e.target.value)}/>
                    <button value={quantity} onClick={updateQuantity}>Update</button>
               
            </div>
        </div>
    )
}

export default UpdateProduct;