import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
const List = ({ chat }) => {
  const router = useRouter();
  return (
    <div
      onClick={() =>
        router.push(`/messages?message=${chat.messagesWith}`, undefined, {
          shallow: true
        })
      }
      className={`flex items-center p-3 rounded-sm hover:bg-blue-100 cursor-pointer ${
        router.query.message === chat.messagesWith ? 'bg-blue-100' : ''
      }`}
    >
      <Image
        width="40"
        height="40"
        className="rounded-full "
        src={chat.profileImage}
      />
      <div className="ml-3">
        <p>{chat.name}</p>
        <p>
          {chat.lastMessage.length > 20
            ? `${chat.lastMessage.substring(0, 20)}...`
            : chat.lastMessage}
        </p>
      </div>
    </div>
  );
};

export default List;
