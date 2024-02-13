import React, { useState } from 'react';
import { BrowserRouter as Switch ,Route, Link } from 'react-router-dom';
import './addToCart.css';
import EmptyCart from '../logo/emptycart.gif'

function AddToCartPage({ cartCount , removeFromCart ,increaseQuantity ,decreaseQuantity}) {
  
  return (
    <>
        <div className="cart-items row gx-0">
        {cartCount.length === 0 ? (
          <img src={EmptyCart} alt="Empty Cart" className="empty-cart-image" />
        ) : (
            <ul>
                {cartCount.map((product) => (
                  <div className='cart-products'>
                    <div key={product.id} className="col-11  d-flex">
                      <div className="cart-product-image">
                        <Link to={`/productdetails/${product.id}`}>
                          <img src={product.image} alt={product.name} className='cart-product-img' />
                        </Link>
                      </div>
                      <div className="cart-product-details">
                        <h4>{product.name}</h4>
                        <p>Size: {product.size}</p>
                        <p>Price: ₹ {product.price}</p>
                        {/* <p>Quantity : {product.quantity}</p> */}
                        <div className="d-flex">
                          <button className='btn quantity-btn quantity-increase' onClick={() => {decreaseQuantity(product.id)}}>-</button>
                          <button className='btn quantity-btn quantity-count'>{product.quantity}</button>
                          <button className='btn quantity-btn quantity-descrease' onClick={() => increaseQuantity(product.id)}>+</button>
                        </div>
                        <div className="cart-item-remove-btn">
                          <button className='btn cart-remove-btn btn-danger mt-3' onClick={() => removeFromCart(product.id)}>Remove</button>
                        </div>
                      </div>
                      </div>
                    </div>
                ))}
            </ul>
            )}
        </div>
    </>
  );
}

export default AddToCartPage;
