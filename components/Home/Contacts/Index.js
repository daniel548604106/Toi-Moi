import React from 'react';
import { DotsHorizontalIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { SearchIcon } from '@heroicons/react/outline';
import Contact from './Contact';
const Index = () => {
  const contacts = [
    {
      name: 'Bill',
      src: 'https://links.papareact.com/xql'
    },
    {
      name: 'Kate',
      src: 'https://links.papareact.com/xql'
    },
    {
      name: 'Billy',
      src: 'https://links.papareact.com/xql'
    }
  ];
  return (
    <div className=" p-2 sticky top-[80px]">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <h2>Contact</h2>
        <div className="flex items-center space-x-2">
          <DotsHorizontalIcon className="h-6" />
          <SearchIcon className="h-6" />
          <VideoCameraIcon className="h-6" />
        </div>
      </div>
      {contacts.map((contact) => (
        <Contact key={contact.name} src={contact.src} name={contact.name} />
      ))}
    </div>
  );
};

export default Index;
