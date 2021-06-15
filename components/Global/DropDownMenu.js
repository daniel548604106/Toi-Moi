import React from 'react';

const DropDownMenu = ({ children }) => {
  return (
    <div className="z-50  max-h-[90vh] overflow-y-auto bg-white w-[360px] transform translate-y-full absolute bottom-1 right-3 shadow-lg p-3 rounded-lg">
      {children}
    </div>
  );
};

export default DropDownMenu;
