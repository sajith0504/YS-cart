// import React, { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import data from '../db.json';

// const Main = () => {
//   const [selectedSize, setSelectedSize] = useState('All');
//   const [products] = useState(data.jacket);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
 
//   useEffect(() => {
//     const savedDarkMode = localStorage.getItem('darkMode');
//     if (savedDarkMode === 'true') {
//       setIsDarkMode(true);
//       document.body.classList.add('darkmode');
//     } else {
//       setIsDarkMode(false);
//       document.body.classList.remove('darkmode');
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const handleAddToCart = (product) => {
//     setCart((prevCart) => {
//       const existingProduct = prevCart.find((item) => item.name === product.name);
//       if (existingProduct) {
//         return prevCart.map((item) =>
//           item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const handleBuy = (product) => {
//     navigate('/B', { state: product });
//   };

//   const filteredProducts = () => {
//     if (selectedSize === 'All') {
//       return products;
//     } else {
//       return products.filter((product) => product.size === selectedSize);
//     }
//   };

//   const toggleDarkMode = () => {
//     const newDarkModeState = !isDarkMode;
//     setIsDarkMode(newDarkModeState);
//     document.body.classList.toggle('darkmode');
//     localStorage.setItem('darkMode', newDarkModeState); // Save preference to localStorage
//   };

//   return (
//    <div className='maincomponent'>
//       <nav className="navbar navbar-expand-lg navbar-light">
//         <div className="container-fluid">
//           <div className="containerLeft">
//             <div className="nav1">
//               <h1>Y<span>$</span></h1>
//             </div>
//           </div>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             {/* <span className="navbar-toggler-icon"></span> */}
//             <i class="fa-solid fa-bars fa-xl"></i>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/">Home</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="#">Features</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" id='dark' to="#" onClick={toggleDarkMode}>
//                   {/* Toggle between sun and moon icon */}
//                   <i className={isDarkMode ? "fa-regular fa-sun" : "fa-regular fa-moon"}></i>
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to='/c'>
//                   <button className="cart-Btn" type="button">
//                     CART
//                   </button>
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className="sizee container">
//         <h1>SIZE</h1>
//         <select className="seleterDropdown" onChange={(e) => setSelectedSize(e.target.value)}>
//           <option className="seleterDropdown__Value" value="All">All</option>
//           <option className="seleterDropdown__Value" value="s">S</option>
//           <option className="seleterDropdown__Value" value="m">M</option>
//           <option className="seleterDropdown__Value" value="xl">XL</option>
//         </select>
//       </div>

//       <div className="maincontent">
//         <div className="container mt-4">
//           <h2>Product List</h2>
//           <div className="row">
//             {filteredProducts().map((product) => (
//               <div key={product.name} className="col-lg-4 col-md-6 col-sm-12">
//                 <div className="card" style={{ marginBottom: '30px' }}>
//                   <img src={product.image} alt={product.name} className="card-img-top" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
//                   <div className="card-body">
//                     <h5 className="card-title">{product.name}</h5>
//                     <p className="card-text">Size: {product.size}</p>
//                     <p className="card-text">Color: {product.color}</p>
//                     <p className="card-text">Price: RS {product.price}</p>
//                     <div className='cardbtn_container'>
//                       <button className="btn" type="button" onClick={() => handleAddToCart(product)}>
//                         <i className="ss fa-solid fa-cart-shopping" style={{ color: 'white' }}></i> ADD TO CART
//                       </button>
//                       <button className="btn2" type="button" onClick={() => handleBuy(product)}>
//                         <strong>BUY</strong>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;












import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import data from '../db.json';

const Main = () => {
  const [selectedSize, setSelectedSize] = useState('All');
  const [products] = useState(data.jacket);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // On component mount, check localStorage for dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('darkmode');
    }
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find((item) => item.name === product.name);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleBuy = (product) => {
    navigate('/B', { state: product });
  };

  const filteredProducts = () => {
    return selectedSize === 'All'
      ? products
      : products.filter((product) => product.size === selectedSize);
  };

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    document.body.classList.toggle('darkmode');
    localStorage.setItem('darkMode', newDarkModeState);
  };

  return (
    <div className='maincomponent'>
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
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">Features</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#" onClick={toggleDarkMode} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                  <i className={isDarkMode ? "fa-regular fa-sun" : "fa-regular fa-moon"}></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/c'>
                  <button className="cart-Btn" type="button">
                    CART
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="sizee container">
        <h1>SIZE</h1>
        <select className="seleterDropdown" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="All">All</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="xl">XL</option>
        </select>
      </div>

      <div className="maincontent">
        <div className="container mt-4">
          <h2>Product List</h2>
          <div className="row">
            {filteredProducts().map((product) => (
              <div key={product.name} className="col-lg-4 col-md-6 col-sm-12">
                <div className="card" style={{ marginBottom: '30px' }}>
                  <img src={product.image} alt={product.name} className="card-img-top" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Size: {product.size}</p>
                    <p className="card-text">Color: {product.color}</p>
                    <p className="card-text">Price: RS {product.price}</p>
                    <div className='cardbtn_container'>
                      <button className="btn" type="button" onClick={() => handleAddToCart(product)}>
                        <i className="fa-solid fa-cart-shopping" style={{ color: 'white' }}></i> ADD TO CART
                      </button>
                      <button className="btn2" type="button" onClick={() => handleBuy(product)}>
                        <strong>BUY</strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;











