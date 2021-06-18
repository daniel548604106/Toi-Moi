import React from 'react';
import NotificationListItem from './NotificationListItem';
import { useRouter } from 'next/router';
const NotificationDropDown = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Notification</h2>
        <span
          onClick={() => router.push('/notifications')}
          className="text-blue-600 cursor-pointer text-sm"
        >
          See All
        </span>
      </div>
      <NotificationListItem />
    </div>
  );
};

export default NotificationDropDown;
