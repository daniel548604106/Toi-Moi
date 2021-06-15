import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
const SidebarRow = ({ src, Icon, title }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleDirectToPage = () => {
    if (src) {
      router.push(`/${userInfo.username}`);
    }
  };
  return (
    <div
      onClick={() => handleDirectToPage()}
      className="flex hover:bg-gray-200 items-center rounded-lg  p-4 cursor-pointer "
    >
      {src && (
        <Image
          width={30}
          height={30}
          layout="fixed"
          className="rounded-full"
          src={src}
        />
      )}
      {Icon && <Icon className="h-8 w-8 text-blue-600 " />}
      <p className="hidden sm:inline-flex font-medium ml-3">{title}</p>
    </div>
  );
};

export default SidebarRow;
