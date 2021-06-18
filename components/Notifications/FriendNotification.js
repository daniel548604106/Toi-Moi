import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { timeDiff } from '../../lib/dayjs';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { apiPostReadSingleNotification, apiPostFriendRequest } from '../../api';
const FriendNotification = ({ notification }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();
  const [isAccepted, setAccepted] = useState(false);
  const handleReadNotification = async (notificationId) => {
    router.push(`/${notification.user.username}`);
    try {
      const res = await apiPostReadSingleNotification(notificationId);
      console.log('res,', res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAcceptFriendRequest = async (e, username) => {
    e.stopPropagation();

    try {
      const res = await apiPostFriendRequest(username);
      setAccepted(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => handleReadNotification(notification._id)}
      className="group relative w-full  p-2 rounded-lg hover:bg-gray-100  cursor-pointer mb-2 flex items-center"
    >
      <div className="flex items-center flex-1">
        <Image
          className="rounded-full cursor-pointer"
          width={50}
          height={50}
          src={notification.user.profileImage}
        />
        <div className=" ml-[10px]">
          <p className="text-sm text-gray-600">
            <span className="text-black font-semibold">
              {notification.user.name}
            </span>{' '}
            {notification.type === 'newFriendInvitation'
              ? 'sent you a friend request'
              : 'accepted your friend request'}
          </p>
          <p
            className={`text-xs text-gray-500 ${
              !notification.isNotificationRead && 'text-blue-600'
            }`}
          >
            {timeDiff(notification.date)}
          </p>{' '}
          {notification.type === 'newFriendInvitation' && !isAccepted && (
            <div className="mt-[5px] w-full flex flex-1 items-center">
              <button
                onClick={(e) =>
                  handleAcceptFriendRequest(e, notification.user.username)
                }
                className="w-full text-xs  cursor-pointer rounded-md p-2 px-4 bg-blue-600 text-white "
              >
                {' '}
                Confirm
              </button>
              <button className="w-full text-xs ml-[10px] cursor-pointer rounded-md p-2 px-4 border">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {!notification.isNotificationRead && (
          <div className="rounded-full ml-[10px] w-[8px] h-[8px] bg-blue-600"></div>
        )}
      </div>
    </div>
  );
};

export default FriendNotification;
