import React from 'react';
import router from 'next/router';
import Image from 'next/image';
const SidebarListItem = ({ Icon, src, title, link }) => {
  return (
    <div>
      {Icon ? (
        <div className="flex hover:bg-gray-200 items-center rounded-lg p-2 sm:p-4 sm:py-3 cursor-pointer ">
          <Icon className="h-8 w-8 text-main " />
          <p className="text-sm sm:text-md sm:inline-flex font-medium ml-3">
            {title}
          </p>
        </div>
      ) : (
        <div
          onClick={() => router.push(`/${link}`)}
          className="flex hover:bg-gray-200 items-center rounded-lg p-2 sm:p-4 sm:py-3 cursor-pointer "
        >
          <img
            alt={title}
            className="w-[35px] h-[35px] rounded-full"
            src={src}
          />
          <p className="text-sm sm:text-md sm:inline-flex font-medium ml-3">
            {title}
          </p>
        </div>
      )}
    </div>
  );
};

export default SidebarListItem;
