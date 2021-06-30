import React from 'react';
import { DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { SearchIcon } from '@heroicons/react/outline';
import Contact from './Contact';
import useTranslation from 'next-translate/useTranslation';

const Index = ({ friends }) => {
  const { t } = useTranslation('common');

  return (
    <div className=" p-2 sticky top-[80px]">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <h2>{t('contact.contact')}</h2>
        <div className="flex items-center space-x-2">
          <SearchIcon className="h-6  cursor-pointer" />
          <VideoCameraIcon className="h-6 cursor-pointer" />
          <DotsHorizontalIcon className="h-6 cursor-pointer" />
        </div>
      </div>
      {friends &&
        friends.map(({ user }) => <Contact key={user._id} user={user} />)}
    </div>
  );
};

export default Index;
