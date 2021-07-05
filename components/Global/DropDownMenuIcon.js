import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { apiPostReadNotifications } from '../../api/index';
import { useDispatch } from 'react-redux';
import { getMyInfo } from '../../redux/slices/userSlice';
const DropDownMenuIcon = ({ Icon, children, title }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [unreadNotification, setUnreadNotification] = useState(
    userInfo.unreadNotification
  );
  const handleReadNotification = async () => {
    try {
      setMenuOpen(!isMenuOpen);
      if (title === 'Notification') {
        setUnreadNotification(false);
        const { data } = await apiPostReadNotifications();
        // Update userInfo
        dispatch(getMyInfo());
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="cursor-none cursor-default group focus:outline-none">
      {title === 'Notification' && unreadNotification && (
        <div className="relative">
          <p className="z-50 absolute text-white flex items-center justify-center top-0 transform -translate-y-1/2 right-0 w-[20px] h-[20px] text-xs rounded-full bg-red-400">
            <span>1</span>
          </p>
        </div>
      )}
      <Icon
        onClick={() => handleReadNotification()}
        className="icon group-hover:text-main group-focus:text-main"
      />{' '}
      <div className="group-focus:block cursor-none hidden">
        {' '}
        <div className="z-50 text-left max-h-[90vh] overflow-y-auto bg-secondary text-primary w-[360px] transform translate-y-full absolute bottom-1 right-0  md:right-3 shadow-lg p-3 rounded-lg">
          {children}
        </div>
      </div>
    </button>
  );
};

export default DropDownMenuIcon;
