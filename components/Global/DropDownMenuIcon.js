import React, { useState } from 'react';

const DropDownMenuIcon = ({ Icon, children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className="group">
      <Icon
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="icon group-hover:text-blue-600"
      />
      <div className="group-hover:block hidden">{children}</div>
    </div>
  );
};

export default DropDownMenuIcon;
