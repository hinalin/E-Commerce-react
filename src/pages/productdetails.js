import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import clothesData from '../clothesdata.json';
import NotFound from './NotFound';
import './productdetails.css';

const ProductDetails = ({addItemsToCart}) => {
    const [count , setCount] = useState(0);
    const [showAddToCartBtn, setShowAddToCartBtn] = useState(true);
    const [showCountBtn , setShowCountBtn] =useState(false)
    const {productId} = useParams();
    const product = clothesData.products.find(product => product.id === parseInt(productId))

    if(!product){
        <NotFound/>
    }
    
    const increaseCount = () => {
        addItemsToCart(product);
        setCount(count + 1);
    };
    
    const decreaseCount = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    
    const handleAddToCart = () => {
        setShowAddToCartBtn(false);
        setShowCountBtn(true);
    }
  return (
    <>

        <div className="container">

            <div className="product-details d-flex">
                <img src={product.image} alt={product.name} className='product-img' />
                <div className="product-info">
                    <h3>{product.name}</h3>
                    <h6>Color: {product.color}</h6>
                    <h6>Size: {product.size}</h6>
                    <h6>Price: ₹ {product.price}</h6>
                    <h5>Other Details:</h5>
                    <p>Lorem ipsum dolor sit itatis quae in quas sequi! In amet incidunt saepe tenetur quam perferendis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus placeat necessitatibus autem! Soluta, nemo non neque, error corrupti tempora cum modi ex aliquid quos, ipsa vitae voluptatem provident delectus sint!</p>

                    <h6>Added Items : {count > 0? count :'no items'}</h6>
                </div>
            </div>
            
            <div className="cart-buttons mt-4">
                {showAddToCartBtn && (
                    <button className='btn cart-btn add-to-cart-btn' onClick={handleAddToCart}>Add To Cart</button>
                )}
                    <button className='btn cart-btn buy-now-btn'>Buy Now</button>
            </div>

            {showCountBtn && (
            <div className="inc-dec-count d-flex">
                <button className='btn count-btn decrease-count' onClick={decreaseCount}>-</button>
                <button className='btn count-btn show-count'>{count}</button>
                <button className='btn count-btn increase-count' onClick={increaseCount}>+</button>
            </div>
            )}
        </div>
    </>
  );
};

export default ProductDetails;


