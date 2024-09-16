


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Cart from './component/Cart';
import Main from './component/Main';
import Buy from './component/Buy';
import './App.css';

function App() {
  

  return (
    <div>
      <Router>
        <Routes>
          
          <Route path='/c' element={<Cart />} /> 
          <Route path='/' element={<Main />} /> 
          <Route path='/B' element={<Buy/>}>  </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
