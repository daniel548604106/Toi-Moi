import router from 'next/router';
import React from 'react';
import Image from 'next/image';
const EmptyFriendList = () => {
  return (
    <div className="flex h-full items-center justify-center flex-col">
      <Image width={100} height={100} src="/images/empty-request.svg" />
      <p className="text-lg sm:text-xl font-semibold mt-3">No Friend</p>
      <button
        onClick={() => router.push(`/friends/suggestions`)}
        className="rounded-lg p-3 bg-main text-white"
      >
        Find new friends
      </button>
    </div>
  );
};

export default EmptyFriendList;
