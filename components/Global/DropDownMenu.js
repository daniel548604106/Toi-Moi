import React from 'react';

const DropDownMenu = ({ children }) => {
  return (
    <div className="z-50 text-left max-h-[90vh] overflow-y-auto bg-white w-[360px] transform translate-y-full absolute bottom-1 right-0  md:right-3 shadow-lg p-3 rounded-lg">
      {children}
    </div>
  );
};

export default DropDownMenu;
