import Image from 'next/image';
const ChatroomMainRoom = ({ messages, receiverProfileImage, socket, user }) => {
  return (
    <div className="chatRoomHeight overflow-y-auto border-b p-5">
      {messages.map((message) => (
        <div key={message.date} className="flex items-center mb-3">
          {message.sender !== user._id && receiverProfileImage && (
            <Image
              width="40"
              height="40"
              className="rounded-full cursor-pointer "
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
  );
};

export default ChatroomMainRoom;
