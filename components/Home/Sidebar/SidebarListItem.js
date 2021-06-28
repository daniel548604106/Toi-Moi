import React from 'react';
import router from 'next/router';
import Image from 'next/image';
const SidebarListItem = ({ Icon, src, title, link }) => {
  return (
    <div>
      {Icon ? (
        <div className="flex hover:bg-gray-200 items-center rounded-lg  p-4 py-3 cursor-pointer ">
          <Icon className="h-8 w-8 text-main " />
          <p className="hidden sm:inline-flex font-medium ml-3">{title}</p>
        </div>
      ) : (
        <div
          onClick={() => router.push(`/${link}`)}
          className="flex hover:bg-gray-200 items-center rounded-lg  p-4 py-3 cursor-pointer "
        >
          <Image className="rounded-full" width={35} height={35} src={src} />
          <p className="hidden sm:inline-flex font-medium ml-3">{title}</p>
        </div>
      )}
    </div>
  );
};

export default SidebarListItem;
