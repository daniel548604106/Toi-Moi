import React, { useState } from 'react';
import {
  PlusIcon,
  PhotographIcon,
  GiftIcon,
  ThumbUpIcon
} from '@heroicons/react/solid';
import Image from 'next/image';
const ChatroomMainRoom = ({
  messages,
  receiverProfileImage,
  socket,
  user,
  sendMsg,
  messagesWith
}) => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmitMessage = (e, msg) => {
    e.preventDefault();
    sendMsg(msg);
    setInputText('');
  };
  return (
    <div className="">
      <div className="flex-1 min-h-[80vh] overflow-y-auto shadow-md p-5 flex-grow">
        {messages.map((message) => (
          <div key={message.date} className="flex items-center mb-3">
            {message.sender !== user._id && receiverProfileImage && (
              <Image
                width="40"
                height="40"
                className="rounded-full "
                src={receiverProfileImage || ''}
              />
            )}
            <span
              className={`inline-block max-w-[250px]   p-2 rounded-lg  ml-2 border  ${
                message.sender === user._id
                  ? 'bg-blue-600 text-white ml-auto'
                  : ''
              }`}
            >
              {message.msg}
            </span>
          </div>
        ))}
      </div>
      <div className="p-2 flex items-center border">
        <div className="flex items-center space-x-2">
          <PlusIcon className="h-5 text-blue-600" />
          <PhotographIcon className="h-5 text-blue-600" />
          <GiftIcon className="h-5 text-blue-600" />
        </div>
        <div className="rounded-xl  w-full ml-3">
          <form onSubmit={(e) => handleSubmitMessage(e, inputText)}>
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full rounded-full py-2  px-5 focus:outline-none bg-gray-100 text-gray-500"
              placeholder="Send new message"
            />
          </form>
        </div>
        <ThumbUpIcon className="h-6 text-blue-600 ml-2" />
      </div>
    </div>
  );
};

export default ChatroomMainRoom;
