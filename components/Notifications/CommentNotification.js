import React from 'react';
import Image from 'next/image';
import { timeDiff } from '../../lib/dayjs';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { apiPostReadSingleNotification } from '../../api';

const CommentNotification = ({ notification }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();
  const handleReadNotification = async (notificationId) => {
    router.push(
      `/${userInfo.username}/posts/${notification.post._id}?comment_id=`
    );
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
            commented your post
          </p>
          <p
            className={`text-xs ${
              !notification.isNotificationRead && 'text-blue-600'
            } text-gray-500 `}
          >
            {timeDiff(notification.date)}
          </p>{' '}
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

export default CommentNotification;
