import React from 'react';

const BirthdayCardLayout = ({ children, title }) => {
  return (
    <div className="bg-secondary  p-3 sm:p-5 rounded-lg text-secondary">
      <h2 className="text-lg sm:text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default BirthdayCardLayout;
