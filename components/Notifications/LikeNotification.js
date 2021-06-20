import React from 'react';
import Image from 'next/image';
import { timeDiff } from '../../lib/dayjs';
import { DotsHorizontalIcon, ThumbUpIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { apiPostReadSingleNotification } from '../../api';
const LikeNotification = ({ notification }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();
  const handleReadNotification = async (notificationId) => {
    router.push(`/${userInfo.username}/posts/${notification.post._id}`);

    try {
      const res = await apiPostReadSingleNotification(notificationId);
      console.log('res,', res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => handleReadNotification(notification._id)}
      className="group relative w-full  p-2 rounded-lg hover:bg-gray-100 justify-between cursor-pointer mb-2 flex items-center"
    >
      <div className="flex items-center">
        <span className="relative">
          <Image
            className="rounded-full object-cover cursor-pointer"
            width={60}
            height={60}
            src={notification.user.profileImage}
          />
          <span className="absolute bottom-1 right-0 rounded-full bg-blue-600 text-white p-1">
            <ThumbUpIcon className="h-4" />
          </span>
        </span>
        <div className=" ml-[10px]">
          <p className="text-sm text-gray-600">
            <span className="text-black font-semibold">
              {notification.user.name}
            </span>{' '}
            likes your post
          </p>
          <p
            className={`text-xs text-gray-500 ${
              !notification.isNotificationRead && 'text-blue-600'
            }`}
          >
            {timeDiff(notification.date)}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="hidden group-hover:block rounded-full cursor-pointer bg-white  border p-2">
          <DotsHorizontalIcon className="h-6 " />
        </div>
        {!notification.isNotificationRead && (
          <div className="rounded-full ml-[10px] w-[8px] h-[8px] bg-blue-600"></div>
        )}{' '}
      </div>
    </div>
  );
};

export default LikeNotification;
