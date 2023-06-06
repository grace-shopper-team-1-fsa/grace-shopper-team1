import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, fetchAllUsers } from '../../store';



const Admin = () =>{

    const products = useSelector(state => state.products);
    const users = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchAllUsers())
    }, [dispatch])

    //console.log(users)

    return(
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <h2>Product List</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <img src={product.image} alt={product.name} style={{ width: '200px' }} />
                <p>Price: {product.price}</p>
                <p>Rating: {product.rating}</p>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '1' }}>
          {/* Render the users' components here */}
          <h2>Users</h2>
          <ul>
            
          </ul>
        </div>
      </div>
    )
}
export default Admin;