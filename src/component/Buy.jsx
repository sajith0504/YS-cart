import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Buy = () => {
  const location = useLocation();
  const product = location.state; 
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
   
    alert('Payment Successful!');
    navigate('/');

  };

  useEffect(() => {
    
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('darkmode');
    } else {
      document.body.classList.remove('darkmode');
    }

    
   
  }, []);

  return (
  <div>
  <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="containerLeft">
            <div className="nav1">
              <h1>Y<span>$</span></h1>
            </div>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars fa-xl"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink style={{ textDecoration: "none" }} to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
<div className="container mt-5">
      {product ? (
        <>
          <h2 className="text-center mb-4">Buy {product.name}</h2>
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <img src={product.image} alt={product.name} className="img-fluid" style={{ height: '400px', objectFit: 'cover' }} />
              <div className="mt-3">
                <p><strong>Price:</strong> RS {product.price*product.quantity ? product.price*product.quantity :product.price}</p>
                <p><strong>Size:</strong> {product.size}</p>
                <p><strong>Color:</strong> {product.color}</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <h4 className="mb-3">Payment Details</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    name="cardNumber"
                    
                    maxLength={16} 
    inputMode="numeric" 
    pattern="\d{16}" 
    onInput={(e) => {
    
      e.target.value = e.target.value.replace(/\D/, '');
    }}
                    required
                  />
                </div>
                <div className="mb-3">
  <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
  <input
    type="month"
    className="form-control"
    id="expiryDate"
    name="expiryDate"
    
    // value={paymentDetails.expiryDate}
    // onChange={handleInputChange}
    required
  />
</div>

                <div className="mb-3">
  <label htmlFor="cvv" className="form-label">CVV</label>
  <input
    type="text"
    className="form-control"
    id="cvv"
    name="cvv"
    maxLength={3} 
    inputMode="numeric" 
    onInput={(e) => {
      
      e.target.value = e.target.value.replace(/\D/, '');
    }}
    required
  />
</div>

                <div className="mb-3">
                  <label htmlFor="cardHolder" className="form-label">Card Holder's Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardHolder"
                    name="cardHolder"
                    // value={paymentDetails.cardHolder}
                    // onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Pay RS {product.price}</button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <p>No product selected.</p>
      )}
    </div>
  </div>
  );
};

export default Buy;
