import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [localCart, setLocalCart] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
 const navigate=useNavigate()
  useEffect(() => {
    // Handle dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('darkmode');
    } else {
      document.body.classList.remove('darkmode');
    }

    // Get cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setLocalCart(storedCart);
  }, []);

  // Function to calculate total price
  const getTotalPrice = () => {
    return localCart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle removing item from cart
  const handleRemoveFromCart = (index) => {
    const updatedCart = [...localCart];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1); // Remove the item from the cart
    }

    setLocalCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBuy = (product) => {
    navigate('/B', { state: product });
  };

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

      <div className="container">
        <div className="row">
          {localCart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            localCart.map((item, index) => (
              <div key={item.name} className="col-lg-4 col-md-6 col-sm-12">
                <div className="card" style={{ marginBottom: "30px" }}>
                  <img src={item.image} alt={item.name} className="card-img-top" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Size: {item.size}</p>
                    <p className="card-text">Color: {item.color}</p>
                    <p className="card-text price">Price: RS {item.price}</p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                   
                    <div className='cardbtn_container'>
                    <button className="btn btn-danger" type="button" onClick={() => handleRemoveFromCart(index)}>
                      Remove
                    </button>
                      <button className="btn2" type="button" onClick={() => handleBuy(item)}>
                        <strong>BUY</strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {localCart.length > 0 && (
          <div className="total-price">
            <h3>Total Price: RS {getTotalPrice().toFixed(2)}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
