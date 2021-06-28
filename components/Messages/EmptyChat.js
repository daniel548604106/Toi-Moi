import React from 'react';
import Image from 'next/image';
const EmptyChat = () => {
  return (
    <div className="w-full flex items-center  justify-center flex-col">
      <Image src="/images/empty-message.svg" width={100} height={100} />
      <div className="mt-3 font-semibold text-lg sm:text-xl">No Message</div>
    </div>
  );
};

export default EmptyChat;
