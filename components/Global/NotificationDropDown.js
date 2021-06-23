import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { apiGetNotifications } from '../../api/index';
import CommentNotification from '../Notifications/CommentNotification';
import FriendNotification from '../Notifications/FriendNotification';
import LikeNotification from '../Notifications/LikeNotification';
const NotificationDropDown = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const { data } = await apiGetNotifications();
        console.log(data);
        setNotifications(data);
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, []);
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
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification._id}>
            {notification.type === 'newLike' && (
              <LikeNotification notification={notification} />
            )}
            {notification.type === 'newComment' && (
              <CommentNotification notification={notification} />
            )}
            {(notification.type === 'newFriendAccepted' ||
              notification.type === 'newFriendInvitation') && (
              <FriendNotification notification={notification} />
            )}
          </div>
        ))
      ) : (
        <div>Notification Box Empty</div>
      )}
    </div>
  );
};

export default NotificationDropDown;
