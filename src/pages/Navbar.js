import React from 'react';
import logo from '../logo/hk (2).png';
import Cartlogo from '../logo/cart-item.svg';
import './Navbar.css';
import {BrowserRouter as Switch ,Route, Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
              <a className="navbar-brand" to="/"><img src={logo} alt="" className='logoimg'/><span className='brand-name'>Creation</span></a>
              <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                  <Link className='nav-link' to='/'>Product list</Link>
                  </li>
                </ul>
              </div>
              <div className="cart-item d-flex">
                <Link to='/addToCart' className='nav-link' style={{textDecoration:"none"}}>
                  <img src={Cartlogo} alt="" />
                  <div className='add-to-cart-count text-center text-white'>{props.cartCount}</div>
                </Link>
                  
              </div>
            </div>
          </nav> 
    </>
  ) 
}

export default Navbar
