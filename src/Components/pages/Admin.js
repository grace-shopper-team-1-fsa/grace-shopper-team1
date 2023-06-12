import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchAllUsers } from '../../store';
import { Link } from 'react-router-dom';



const Admin = () =>{

    const products = useSelector(state => state.products);
    const users = useSelector(state => state.users.usersList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchAllUsers())
    }, [dispatch])

    return(
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <h2>Product List</h2>
          <Link to={'/admin/addproduct'}>
            <h3>Add Product</h3>
          </Link>
          <ul>
            {products.map((product) => {
                return (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <img src={product.image} alt={product.name} style={{ width: '200px' }} />
                        <p>Price: {product.price}</p>
                        <p>Rating: {product.rating}</p>
                        <p>{product.description}</p>
                        <Link to={`/admin/updateproduct/${product.id}`}>
                            <h3>Update</h3>
                        </Link>
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
                    </li>
                )
            })}
          </ul>
        </div>
      </div>
    )
}
export default Admin;