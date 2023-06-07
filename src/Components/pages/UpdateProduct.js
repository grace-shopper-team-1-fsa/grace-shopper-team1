import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UpdateProduct = (props) => {
    const {product, lineItem} = props;
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
                    <Link to={`/products/${product.id}`}>View Full Product Details</Link>
                </div>
            </div>
            <div>
                <button key={'options'} onClick={() => setActive(tabs[0])}>OPTIONS</button>
                <button key={'details'} onClick={() => setActive(tabs[1])}>DETAILS</button>
                <form>
                    <label>QTY:</label>
                    <input type="number" value={quantity} min="0" max="10" onChange={e=> setQuantity(e.target.value)}/>
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct;