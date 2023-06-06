import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../store';


const Admin = () =>{

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    console.log(products)

    return(
        <div>
            <h2>Product list</h2>
            <ul>
                {products.map((product) => {
                    return ( 
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>Description: {product.description}</p>
                            <img src={product.image} alt={product.name} />
                            <p>Price: {product.price}</p>
                            <p>Rating: {product.rating}</p>
                            <button>update</button>
                            <button>remove</button>
                       </li>               
                    )
                })}       
            </ul>
        </div>
    )
}
export default Admin;