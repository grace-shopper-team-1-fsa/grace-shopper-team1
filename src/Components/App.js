import React, { useEffect } from 'react';
//import Home from './Home';
//import Login from './Login';
//import Cart from './Cart';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import { Admin, Cart, Home, MyAccount, Navbar, SingleProduct } from './pages';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  useEffect(()=> {
    if(auth.id){
      dispatch(fetchCart());
    }
  }, [auth]);
  return (
    <div>
      <Navbar/>
      {
        auth.id ? <Home /> : <Login />
      }
      {
        !!auth.id  && (
          <div>
            <nav>
              <Link to='/'>Home</Link>
              <Link to='/cart'>Cart</Link>
            </nav>
            <Routes>
              <Route path='/cart' element={ <Cart /> } />
              <Route path='/myaccount' element={<MyAccount/>}/>
              <Route path='/admin' element={<Admin/>}/>
              <Route path='/:id' element={<SingleProduct/>} />
            </Routes>
          </div>
        )
      }
    </div>
  );
};

export default App;
