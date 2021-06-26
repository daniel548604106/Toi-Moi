import Image from 'next/image';
const ChatroomMainRoom = ({
  messages,
  divRef,
  receiverProfileImage,
  socket,
  user
}) => {
  return (
    <div className="flex-1 overflow-y-auto border-b p-5">
      {messages.map((message) => (
        <div ref={divRef} key={message.date} className="flex items-center mb-3">
          {message.sender !== user._id && receiverProfileImage && (
            <Image
              width="40"
              height="40"
              className="rounded-full cursor-pointer "
              src={receiverProfileImage || ''}
            />
          )}
          <span
            className={`max-w-[300px] overflow-auto break-all  p-2 rounded-lg  ml-2 border  ${
              message.sender === user._id ? 'bg-main text-white ml-auto' : ''
            }`}
          >
            {message.msg}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatroomMainRoom;
