import React, { useEffect } from 'react';
//import Home from './Home';
//import Login from './Login';
//import Cart from './Cart';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import { Admin, Cart, Home, MyAccount, Navbar, SingleProduct, About, 
  LoginRegister, ProductCard, UpdateProductForm, 
  UpdateUserForm, AddProductForm, Checkout } from './pages';

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
      <Navbar />

      {/* {
        auth.id && <LoginRegister />
      } */}
      <Routes>
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/'element={<Home />} />
        <Route path='/product/:id' element={<SingleProduct/>} />
        <Route path='/login' element={<LoginRegister/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
      {
        !!auth.id  && (
          
          <div>
            <Routes>
              <Route path='/myaccount' element={<MyAccount/>}/>
              <Route path='/myaccount/updateuserinfo' element={<UpdateUserForm />} />
              <Route path='/checkout'element={<Checkout />} />
            </Routes>
          </div>
        )
      }
      {
        !!auth.id && auth.permissions && (
          <div>
            <Routes>
              <Route path='/admin' element={<Admin/>}/>
              <Route path='/admin/updateproduct/:id' element={<UpdateProductForm />} />
              <Route path='/admin/addproduct'element={<AddProductForm />} />
            </Routes>
          </div>
        )
      }
    </div>
  );
};

export default App;
