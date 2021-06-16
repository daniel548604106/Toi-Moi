import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const DropDownMenuIcon = ({ Icon, children, title }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className="group">
      {title === 'Notification' && userInfo.unreadNotification && (
        <div className="relative">
          <span className="z-50 absolute top-0 transform -translate-y-1/2 right-0 p-1 text-xs text-white rounded-full bg-red-400">
            1
          </span>
        </div>
      )}
      <Icon
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="icon group-hover:text-blue-600"
      />{' '}
      <div className="group-hover:block hidden">{children}</div>
    </div>
  );
};

export default DropDownMenuIcon;
