import React from 'react';

const SectionCard = ({ children, title }) => {
  return (
    <div className="rounded-lg border p-3 bg-white">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {children}
    </div>
  );
};

export default SectionCard;
