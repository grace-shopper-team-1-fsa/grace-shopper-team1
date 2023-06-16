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
  const {cart} = useSelector(state=>state);
  const {orders} = useSelector(state=>state);

  
  useEffect(()=> {
    dispatch(loginWithToken());
    dispatch(fetchProducts());
    dispatch(fetchAllReviews());
    dispatch(fetchCart());
  }, []);
  
  useEffect(()=> {
    if(auth.id){
      dispatch(fetchOrders());
      dispatch(fetchAllUsers());
    }
    dispatch(fetchCart()) 
  }, [auth]);

  return (
    <div>
      <Navbar numCartItems={cart.lineItems.length>0 ? cart.lineItems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,0):0} auth={auth} cart={cart}/>
      <Routes>
        <Route path='/cart' element={ <Cart cart={cart} auth={auth}/> } />
        <Route path='/'element={<Home />} />
        <Route path='/product/:id' element={<SingleProduct/>} />
        <Route path='/login' element={<LoginRegister/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
      {
        !!auth.id  && (        
          <div>
            <Routes>
              <Route path='order/:id' element={<PastOrder/>}/>
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
