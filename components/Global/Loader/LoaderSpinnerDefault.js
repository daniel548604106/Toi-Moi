import React from 'react';
import './Loader.module.css';
const LoaderSpinnerDefault = () => {
  return (
    <div className="cell">
      <div className="card">
        <span className="spinner-loader">Loading&#8230;</span>
      </div>
    </div>
  );
};

export default LoaderSpinnerDefault;
