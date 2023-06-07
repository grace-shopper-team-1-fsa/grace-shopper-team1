import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, fetchAllUsers } from '../../store';
import { Link } from 'react-router-dom';



const Admin = () =>{

    const products = useSelector(state => state.products);
    const users = useSelector(state => state.users.usersList)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchAllUsers())
    }, [dispatch])
    
    return(
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <h2>Product List</h2>
          <ul>
            {products.map((product) => {
                return (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <img src={product.image} alt={product.name} style={{ width: '200px' }} />
                        <p>Price: {product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <Link to={`/updateproduct/${product.id}`}>
                            <h3>update</h3>
                        </Link>
                        <button>Remove</button>
                    </li>
                  )  
                })}
          </ul>
        </div>
        <div style={{ flex: '1' }}>
          <h2>Users</h2>
          <ul>
            {users.map((user) => {
                return (
                    <li key={user.id}>
                        <h3>{user.username}</h3>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                        <p>{user.homeAddress}</p>
                        <p>{user.shippingAddress}</p>
                        <p>{user.avatar}</p>
                        <Link to={`/updateuser/${user.id}`}>
                            <h3>update</h3>
                        </Link>
                        <button>Remove</button>
                    </li>
                )
            })}
          </ul>
        </div>
      </div>
    )
}
export default Admin;