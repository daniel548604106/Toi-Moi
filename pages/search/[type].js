import React from 'react';
import SidebarList from '../../components/Search/SidebarList';
import router from 'next/router';
import SectionCard from '../../components/Search/SectionCard';
import FilterListRow from '../../components/Search/FilterListRow';
import {
  UsersIcon,
  ChartSquareBarIcon,
  PhotographIcon
} from '@heroicons/react/outline';
const SearchType = () => {
  const filterList = [
    {
      title: 'All',
      param: 'top',
      Icon: ChartSquareBarIcon
    },
    {
      title: 'Posts',
      param: 'posts',
      Icon: PhotographIcon
    },
    {
      title: 'People',
      param: 'people',
      Icon: UsersIcon
    }
  ];
  return (
    <div className="flex-col md:flex-row flex fullBodyHeight">
      <div className="w-full md:block hidden fullBodyHeight max-w-[360px]">
        <SidebarList filterList={filterList} />
      </div>
      <div className="md:hidden block">
        <FilterListRow filterList={filterList} />
      </div>
      <div className="flex-1 py-7 px-3">
        {router.query.type === 'top' && (
          <div className="w-full max-w-[700px] space-y-3  mx-auto">
            <SectionCard title="People">hihi</SectionCard>
            <SectionCard title="Posts">hihi</SectionCard>
          </div>
        )}
        {router.query.type === 'posts' && (
          <div className="w-full max-w-[700px] mx-auto">posts</div>
        )}
        {router.query.type === 'people' && (
          <div className="w-full max-w-[700px] mx-auto">People</div>
        )}
      </div>
    </div>
  );
};

export default SearchType;
