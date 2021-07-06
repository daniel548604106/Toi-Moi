import React, { useState, useEffect } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { ThumbUpIcon } from '@heroicons/react/solid';
import { apiGetChat } from '../../../api/index';
import { useSelector } from 'react-redux';
const MessagePopup = ({
  isActive,
  idx,
  setNewMessagePopup,
  newMessagePopup,
  handleSubmitMessage,
  scrollToBottom,
  divRef,
  received
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { userInfo } = useSelector((state) => state.user);
  const handleSetMessagePopup = () => {
    if (newMessagePopup.includes(idx)) {
      setNewMessagePopup(newMessagePopup.filter((index) => index !== idx));
    } else {
      setNewMessagePopup((newMessagePopup) => [...newMessagePopup, idx]);
    }
  };

  const handleRemoveMessageReceived = () => {
    setNewMessageReceived(
      newMessageReceived.filter((received) => received.senderId !== id)
    );
  };

  const handleSendMsg = (e) => {
    e.preventDefault();
    handleSubmitMessage(received.sender, newMessage);
    setNewMessage('');
  };
  const getChat = async () => {
    try {
      const { data } = await apiGetChat(received.sender);
      console.log(data, 'messages');
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    messages.length > 0 && scrollToBottom(divRef);
  }, [messages]);

  useEffect(() => {
    getChat();
  }, [isActive]);

  return (
    <div className="w-[300px] border rounded-t-lg bg-secondary">
      <div
        onClick={() => handleSetMessagePopup()}
        className="flex items-center cursor-pointer justify-between p-2 rounded-t-lg bg-main text-white"
      >
        <span>{received.senderName}</span>
        <XIcon onClick={() => handleRemoveMessageReceived()} className="h-6" />
      </div>
      {isActive && (
        <div>
          <div className={`h-[350px] overflow-y-auto border p-2`}>
            {messages.length > 0 &&
              messages.map((message) =>
                userInfo._id !== message.sender ? (
                  <div className="flex items-center flex-wrap mb-2 ">
                    <p
                      ref={divRef}
                      className="max-w-[200px] text-sm sm:text-md p-2 border rounded-lg"
                    >
                      {message.msg}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center flex-wrap mb-2 justify-end ">
                    <p className="max-w-[200px]  bg-main text-white text-sm sm:text-md p-2 border rounded-lg">
                      {message.msg}
                    </p>
                  </div>
                )
              )}
          </div>
          <div className="p-2 flex items-center ">
            <form
              onSubmit={(e) => handleSendMsg(e)}
              className=" w-full mr-2 flex items-center rounded-full border p-1 bg-secondary"
            >
              <input
                className="text-xs sm:text-sm rounded-lg w-full bg-secondary"
                type="text"
                className="px-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="write something.."
              />
            </form>
            <ThumbUpIcon className="h-6 text-main " />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagePopup;
