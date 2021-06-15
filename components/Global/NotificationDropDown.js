import React from 'react';
import NotificationDropDownList from './NotificationDropDownList';
const NotificationDropDown = () => {
  const notificationLists = Array.from({ length: 12 });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Notification</h2>
        <span className="text-blue-600 cursor-pointer text-sm">See All</span>
      </div>
      {notificationLists.map((list) => (
        <NotificationDropDownList key={list} />
      ))}
    </div>
  );
};

export default NotificationDropDown;
