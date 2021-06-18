import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import Image from 'next/image';
const NotificationListItem = ({ notification }) => {
  useEffect(() => {
    console.log(notification, 'ugugu');
  }, []);
  const userInfo = useSelector((state) => state.user.userInfo);
  if (!notification) return <div>Loading</div>;
  return (
    <div className="relative   p-2 flex items-center rounded-xl cursor-pointer hover:bg-gray-100">
      <Image
        className="rounded-full cursor-pointer"
        src={notification.user.profileImage}
        width={60}
        height={60}
      />
      <div className="ml-[10px]">{notification.user.name}</div>
      <span className="rounded-full top-1/2  right-4 transform -translate-y-1/2 absolute  p-2 hover:bg-gray-100 bg-white cursor-pointer border ">
        <DotsHorizontalIcon className="h-6" />
      </span>
    </div>
  );
};

export default NotificationListItem;
