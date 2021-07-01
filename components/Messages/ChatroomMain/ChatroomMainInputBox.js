import React, { useState } from 'react';
import {
  PlusIcon,
  PhotographIcon,
  GiftIcon,
  ThumbUpIcon
} from '@heroicons/react/solid';
const InputBox = ({ sendMsg, t }) => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmitMessage = (e, msg) => {
    e.preventDefault();
    sendMsg(msg);
    setInputText('');
  };
  return (
    <div className="p-2 flex items-center border-b">
      <div className="flex items-center space-x-2">
        <PlusIcon className="h-5 text-main" />
        <PhotographIcon className="h-5 text-main" />
        <GiftIcon className="h-5 text-main" />
      </div>
      <div className="rounded-xl  w-full ml-3">
        <form onSubmit={(e) => handleSubmitMessage(e, inputText)}>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className=" text-sm max-h-[100px] overflow-y-scroll sm:text-md w-full rounded-full py-2  px-5 focus:outline-none bg-gray-100 text-gray-500"
            placeholder={t('sendNewMessage')}
          />
        </form>
      </div>
      <ThumbUpIcon
        onClick={(e) => handleSubmitMessage(e, inputText)}
        className="h-6 text-main ml-2"
      />
    </div>
  );
};

export default InputBox;
