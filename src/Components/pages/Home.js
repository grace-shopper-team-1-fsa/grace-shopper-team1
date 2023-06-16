import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchProducts} from '../../store/productsSlice';
import {ProductCard} from './';
import { fetchCart } from '../../store';

const Home = () =>{
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [query, setQuery] = useState('');
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    
   // useEffect(()=>{
       // dispatch(fetchProducts())
        //dispatch(fetchCart())
   // }, [dispatch])

    return(
        <div className="home">
            <input
                className = 'product-search-bar'
                type="text"
                onChange={e => setQuery(e.target.value)}
                value={query}
                placeholder="Search products"
            />
            <div className = 'product-cards'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products found matching your search.</p>
                )}
            </div>
        </div>
    )
}
export default Home;