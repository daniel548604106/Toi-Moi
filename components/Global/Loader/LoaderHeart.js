import React from 'react';
import './Loader.module.css';
const LoaderHeart = () => {
  return (
    <div className="container">
      <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="shadow"></div>
    </div>
  );
};

export default LoaderHeart;
