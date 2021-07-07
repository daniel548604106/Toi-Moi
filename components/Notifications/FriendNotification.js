import React, { useState } from 'react';
import { timeDiff } from '../../lib/dayjs';
import { UsersIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  apiPostReadSingleNotification,
  apiPostFriendRequest,
  apiRejectFriendRequest
} from '../../api';
import Avatar from '../Global/Avatar';
import useTranslation from 'next-translate/useTranslation';

const FriendNotification = ({ notification, removeNotification }) => {
  const { t } = useTranslation('header');
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();
  const [isAccepted, setAccepted] = useState(false);
  const handleReadNotification = async (notificationId) => {
    router.push(`/${notification.user.username}`);
    try {
      await apiPostReadSingleNotification(notificationId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAcceptFriendRequest = async (e, username) => {
    e.stopPropagation();
    setAccepted(true);
    try {
      const res = await apiPostFriendRequest(username);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRejectRequest = async (e, username) => {
    e.stopPropagation();
    removeNotification(notification._id);
    try {
      await apiRejectFriendRequest(username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => handleReadNotification(notification._id)}
      className={`${
        isAccepted ? 'cursor-pointer' : 'cursor-none'
      } group relative w-full  p-2 rounded-lg hover:bg-gray-100   mb-2 flex items-center`}
    >
      <div className=" flex items-center flex-1">
        <span className="relative">
          <Avatar
            width="60"
            height="60"
            layout="fixed"
            gender={notification.user.gender}
            profileImage={notification.user.profileImage}
          />
          <span className="absolute bottom-1 right-0 bg-gray-800  rounded-full p-1">
            <UsersIcon className="h-4 text-white" />
          </span>
        </span>

        <div className=" ml-[10px]">
          <p className="text-sm text-primary">
            <span className="text-primary cursor-pointer hover:underline font-semibold">
              {notification.user.name}
            </span>{' '}
            {notification.type === ('newFriendInvitation' && isAccepted) ||
              (notification.type === 'newFriendAdded' && (
                <span>{`You are now friend with  ${notification.user.name}`}</span>
              ))}
            {notification.type === 'newFriendInvitation' && !isAccepted && (
              <span>sent you a friend request</span>
            )}
            {notification.type === 'newFriendAccepted' &&
              t('acceptedYourFriendRequest')}
          </p>
          <p
            className={`text-xs text-gray-500 ${
              !notification.isNotificationRead && 'text-main'
            }`}
          >
            {timeDiff(notification.date)}
          </p>{' '}
          {notification.type === 'newFriendInvitation' && !isAccepted && (
            <div className="mt-[5px] w-full flex flex-1 items-center">
              <div
                onClick={(e) =>
                  handleAcceptFriendRequest(e, notification.user.username)
                }
                className={`flex items-center justify-center w-full text-xs cursor-pointer   rounded-md p-2 px-4 bg-main text-white `}
              >
                {t('confirm')}
              </div>
              <div
                onClick={(e) =>
                  handleRejectRequest(e, notification.user.username)
                }
                className=" flex items-center justify-center w-full text-xs ml-[10px] cursor-pointer rounded-md p-2 px-4 border"
              >
                {t('cancel')}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {!notification.isNotificationRead && (
          <div className="rounded-full ml-[10px] w-[8px] h-[8px] bg-main"></div>
        )}
      </div>
    </div>
  );
};

export default FriendNotification;
