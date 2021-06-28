import React from 'react';
import Image from 'next/image';
const EmptyNotification = () => {
  return (
    <div className="min-h-[300px] w-full flex flex-col justify-center items-center">
      <Image src="/images/empty-box.svg" width={100} height={100} />
      <span className="font-semibold text-lg sm:text-xl mt-3">
        No notifications
      </span>
    </div>
  );
};

export default EmptyNotification;
