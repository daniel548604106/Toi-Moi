import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { UsersIcon, ChatAlt2Icon, ThumbUpIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
const NotificationList = ({ notification }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const notificationMessage = (type) => {
    switch (type) {
      case 'newFriendAccepted':
        return 'accepted your friend request';
      case 'newFriendInvitation':
        return 'sent you a friend request';
      case 'newLike':
        return 'likes your post';
      case 'newComment':
        return 'commented on your post';
      default:
        return '';
    }
  };

  const handleDirectToNotification = (type) => {
    switch (type) {
      case 'newFriendAccepted':
        router.push(`/${notification.user.username}`);
        break;
      case 'newFriendInvitation':
        router.push(`/${notification.user.username}`);
        break;
      case 'newLike':
        router.push(`/${userInfo.username}/posts/${notification.post._id}`);
        break;
      case 'newComment':
        router.push(`/${userInfo.username}/posts/${notification.post._id}`);
      default:
        return;
    }
  };
  if (!notification.type) return <div>Loading</div>;
  return (
    <div
      onClick={() => handleDirectToNotification(notification.type)}
      className="p-2 flex items-center hover:bg-gray-100 rounded-md cursor-pointer"
    >
      <span className="relative">
        <Image
          className="rounded-full object-cover"
          src={notification.user.profileImage}
          width={60}
          height={60}
        />
        {notification.type === 'newLike' && (
          <span className="absolute bottom-1 right-0 bg-blue-600 rounded-full p-1 text-white">
            <ThumbUpIcon className="h-5" />
          </span>
        )}
        {notification.type === 'newComment' && (
          <span className="absolute bottom-1 right-0 bg-green-400 rounded-full p-1 text-white">
            <ChatAlt2Icon className="h-5" />
          </span>
        )}
        {(notification.type === 'newFriendAccepted' ||
          notification.type === 'newFriendInvitation') && (
          <span className="absolute bottom-1 right-0 bg-gray-600 rounded-full p-1 text-white">
            <ChatAlt2Icon className="h-5" />
          </span>
        )}
      </span>
      <div className="ml-[10px]">
        <span className="text-sm font-semibold">{notification.user.name}</span>
        <span className="text-xs text-gray-600 ml-[3px]">
          {notificationMessage(notification.type)}
        </span>
      </div>
    </div>
  );
};

export default NotificationList;
