import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchProducts} from '../../store/productsSlice';
import {ProductCard} from './';

const Home = () =>{
    const dispatch = useDispatch();
    
    const products = useSelector(state => state.products);

    useEffect(()=>{
        dispatch(fetchProducts())
    }, [dispatch])

    return(
        <div className="home">
            {
                products.map(product=>{
                    return <ProductCard key={product.id} product={product}/>
                })
            }
        </div>
    )
}
export default Home;