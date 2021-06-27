import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const DropDownMenuIcon = ({ Icon, children, title }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <button className="group focus:outline-none">
      {title === 'Notification' && userInfo.unreadNotification && (
        <div className="relative">
          <span className="z-50 absolute top-0 transform -translate-y-1/2 right-0 p-1 text-xs text-secondary rounded-full bg-red-400">
            1
          </span>
        </div>
      )}
      <Icon
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="icon group-hover:text-main group-focus:text-main"
      />{' '}
      
      <div className="group-focus:block hidden">  <div className="z-50 text-left max-h-[90vh] overflow-y-auto bg-secondary text-primary w-[360px] transform translate-y-full absolute bottom-1 right-0  md:right-3 shadow-lg p-3 rounded-lg">
      {children}
    </div></div>
    </button>
  );
};

export default DropDownMenuIcon;
