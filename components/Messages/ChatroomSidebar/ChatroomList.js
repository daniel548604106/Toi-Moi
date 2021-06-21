import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { timeDiff } from '../../../lib/dayjs';
const List = ({ chat, connectedUsers }) => {
  const router = useRouter();
  const isOnline =
    connectedUsers.length > 0 &&
    connectedUsers.filter((user) => user.userId === chat.messagesWith).length >
      0;
  return (
    <div
      onClick={() =>
        router.push(`/messages?message=${chat.messagesWith}`, undefined, {
          shallow: true
        })
      }
      className={`flex items-center p-3 rounded-md hover:bg-blue-100 cursor-pointer ${
        router.query.message === chat.messagesWith ? 'bg-blue-100' : ''
      }`}
    >
      <div className="relative ">
        <Image
          width="40"
          height="40"
          className="rounded-full "
          src={chat.profileImage}
        />
        {isOnline && (
          <div className="absolute bottom-0 right-0 h-[5px] w-[5px] rounded-full bg-green-300"></div>
        )}
      </div>
      <div className="ml-3 flex-1 truncate overflow-hidden">
        <div className="flex items-center justify-between w-full">
          <p className="mr-2">{chat.name}</p>
          <p className="text-xs text-gray-600">{timeDiff(chat.date)}</p>
        </div>
        <p className="overflow-ellipsis">{chat.lastMessage}</p>
      </div>
    </div>
  );
};

export default List;
