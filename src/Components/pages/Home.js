import React from 'react';
import { useSelector } from 'react-redux';
import { products } from '../../store';

const Home = () =>{
    const {products} = useSelector(state => state);
    return(
        <div>
            
        </div>
    )
}
export default Home;