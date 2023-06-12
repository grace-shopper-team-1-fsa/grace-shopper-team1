import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart, fetchAllReviews, fetchAllUsers, fetchOrders, fetchProducts } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import { Admin, Cart, Home, MyAccount, Navbar, SingleProduct, About, 
  LoginRegister, UpdateProductForm, 
  UpdateUserForm, AddProductForm, Checkout, PastOrder } from './pages';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(loginWithToken());
    dispatch(fetchProducts());
    dispatch(fetchAllReviews());
    dispatch(fetchAllUsers());
    dispatch(fetchOrders());
    const cart = {
      lineItems: [],
      total: 0,
    }
  
    if(!auth.id){
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, []);
  
  useEffect(()=> {
    if(auth.id){
      dispatch(fetchCart());
      const cart = useSelector(state=>state);
      console.log(cart);
    } 
  }, [auth]);
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='order/:id' element={<PastOrder/>}/>
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
