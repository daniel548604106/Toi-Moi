import React from 'react';
import { useRouter } from 'next/router';
import SidebarListItem from '../Activity/SidebarListItem';

const SidebarLIst = ({ filterList }) => {
  const router = useRouter();
  return (
    <div className="bg-white p-5 h-full border-r">
      <div className="flex items-center">
        <span className="text-gray-400 ">{router.query.q}'s</span>
        <h2 className="text-xl font-semibold ml-[5px]">Search Result</h2>
      </div>
      <hr className="my-2" />
      <div>
        <h3 className="text-md font-semibold my-2">Filter</h3>
        {filterList.map((list) => (
          <SidebarListItem
            key={list.title}
            param={list.param}
            title={list.title}
            Icon={list.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarLIst;
