import React, { useState, useEffect } from 'react';
import {
  PencilAltIcon,
  VideoCameraIcon,
  DotsHorizontalIcon,
  SearchIcon
} from '@heroicons/react/solid';
import ToolTips from './ToolTips';
import { apiGetChats } from '../../api';
import { useRouter } from 'next/router';
import MessageDropDownList from './MesseageDropDownList';
const MessageDropDown = ({ t }) => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiGetChats();
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Messenger</h2>
        <div className="flex items-center">
          <span className="group relative">
            <PencilAltIcon className="h-6" />
            <ToolTips>編輯</ToolTips>
          </span>
          <span className="group relative">
            <VideoCameraIcon className="h-6" />
            <ToolTips>建立新的包廂</ToolTips>
          </span>
          <span className="group relative">
            <DotsHorizontalIcon className="h-6" />
            <ToolTips>更多選項</ToolTips>
          </span>
        </div>
      </div>
      <div className="rounded-full w-full m-2  p-1 pl-3  bg-gray-100 flex items-center">
        <SearchIcon className="h-5 text-gray-400 mr-[10px]" />
        <input
          className="bg-gray-100 focus:outline-none"
          type="text"
          placeholder={t('searchMessenger')}
        />
      </div>
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageDropDownList key={message.messagesWith} message={message} />
        ))
      ) : (
        <div>No Message</div>
      )}

      <div
        onClick={() => router.push('/messages')}
        className="border-t pt-2 text-main text-center hover:underline cursor-pointer"
      >
        {t('viewAllInMessenger')}
      </div>
    </div>
  );
};

export default MessageDropDown;
