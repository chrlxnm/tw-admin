import './style.css';

import React from 'react';

const SplashScreen = () => {
  return (
    <div style={{backgroundColor: 'white'}}>
    <div className="splash-screen">
      <div style={{display: 'flex', fontStyle: 'italic'}}>
      <h1>Employee</h1><h1 style={{color:'red'}}>Corner</h1>
      </div>
    </div>
    </div>
  );
};

export default SplashScreen;