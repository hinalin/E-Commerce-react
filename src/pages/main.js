import React, { useState } from 'react';
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Productlist from './productlist';
import ProductDetails from './productdetails';
import Navbar from './Navbar';
import AddToCartPage from './addToCart'

function Main() {

    const [cartCount, setCartCount] = useState([]);

    const addItemsToCart = (productData) => {
        const existingItemIndex = cartCount.findIndex((item) => item.id === productData.id);
        if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartCount];
        updatedCartItems[existingItemIndex].quantity++;
        setCartCount(updatedCartItems);
        } else {
        setCartCount([...cartCount, { ...productData, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCartCount(cartCount.filter(item => item.id !== productId));
    };

    const increaseQuantity = (productId) => {
        const updatedCartItems = cartCount.map(product => {
        if (product.id === productId) {
            return { ...product, quantity: product.quantity + 1 };
        }
        return product;
        });
        setCartCount(updatedCartItems);
    };

    const decreaseQuantity = (productId) => {
        const updatedCartItems = cartCount.map(product => {
        if (product.id === productId && product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
        }
        return product;
        });
        setCartCount(updatedCartItems);
    };
    
    
  return (
    <>
       <Router>
        <Navbar cartCount={cartCount.length} />
        <Routes>
          <Route path='/' element={<Productlist/>}></Route>
          <Route path='/productdetails/:productId' element={<ProductDetails addItemsToCart={addItemsToCart}/>}></Route>
          <Route path='/addToCart' element={<AddToCartPage cartCount={cartCount} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />} />
        </Routes>
      </Router >
    </>
  )
}

export default Main
