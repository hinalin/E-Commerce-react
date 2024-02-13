import React, { useState, useEffect } from 'react';
import {BrowserRouter as Switch ,Route, Link } from 'react-router-dom';
import './productlist.css';
import clothesData from '../clothesdata.json';
import NotFound from './NotFound';

function Productlist(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const productsPerPage = 8;
  const totalProducts = searchProducts.length;
  const totalPages = Math.ceil(searchProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = searchProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = clothesData.products.filter(product =>
      product.category.toLowerCase().includes(search.toLowerCase()) &&
      (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
      (selectedSizes.length === 0 || selectedSizes.includes(product.size))
    );
    setSearchProducts(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    setSearchProducts(clothesData.products);
  }, []);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  return (
    <>
      <div className="header">
        {/* <Navbar /> */}

        <div className="search-filter">
          {totalProducts === 0 ? (
            <h4>No products found</h4>
            ) : (
              <h4>Showing Result {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct , totalProducts)} Out Of {totalProducts}</h4>
              )}
          <form className="d-flex">
            <input className="form-control me-2" placeholder="Search" id="search" name="search" onChange={(event) => setSearch(event.target.value)} />

            <div className="multiselect" id='filter'>
              <div className="selectBox" onClick={toggleOptions}>
                <select className='filter-select'>
                  <option>Filter</option>
                </select>
              </div>
              {showOptions && (
                <div className="options">
                  <div className="selectBox">
                    <div className='overSelect'>
                    <b>Color</b>
                    {['Pink', 'Black', 'Navy', 'Dark Blue', 'Blue', 'Dark Green', 'Brown' , 'White' , 'Orange' , 'Green'].map(color => (
                      <label key={color} htmlFor={color}>
                        <input
                          type="checkbox"
                          id={color}
                          value={color}
                          checked={selectedColors.includes(color)}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedColors([...selectedColors, event.target.value]);
                            } else {
                              setSelectedColors(selectedColors.filter(item => item !== event.target.value));
                            }
                          }}
                        />
                        {color}
                      </label>
                    ))}

                    <b>Size</b>
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free', '30x30', '32x32'].map(size => (
                      <label key={size} htmlFor={size}>
                        <input
                          type="checkbox"
                          id={size}
                          value={size}
                          checked={selectedSizes.includes(size)}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setSelectedSizes([...selectedSizes, event.target.value]);
                            } else {
                              setSelectedSizes(selectedSizes.filter(item => item !== event.target.value));
                            }
                          }}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>
                </div>
              )}
            </div>

            <button className="btn btn-outline-success btn-success text-light" type="submit" onClick={handleSearch}>Search</button>
          </form>
        </div>

      </div>

      <div className="container-fluid">
        
        <div className="product-list">
          {totalProducts === 0 ? (
            <NotFound />
          ) : (
            <div className="row ppp" style={{ marginTop: "0px" }}>
              {currentProducts.map((product) => (
                <div key={product.id} className="col-lg-3 product">
                  <Link to={`/ProductDetails/${product.id}`} style={{textDecoration:"none"}}>
                    <img src={product.image} alt={product.name} className='product-image' />
                    <h6>{product.name}</h6>
                    <p>Price: ₹ {product.price}</p>
                    <p>Size: {product.size}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      

        {totalProducts > 0 && (
          <div className="product-pagination">
            <div className="pagination">
              <a href="#" onClick={handlePrevPage}>&laquo;</a>
              {[...Array(totalPages).keys()].map((page) => (
                <a
                  key={page}
                  href="#"
                  className={currentPage === page + 1 ? 'active' : ''}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </a>
              ))}
              <a href="#" onClick={handleNextPage}>&raquo;</a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Productlist;
