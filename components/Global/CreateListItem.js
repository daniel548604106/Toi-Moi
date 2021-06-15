import React from 'react';

const CreateListItem = ({ Icon, title, description }) => {
  return (
    <div className="flex cursor-pointer items-center p-2 rounded-lg hover:bg-gray-100">
      <Icon className="h-10 p-2 rounded-full bg-gray-200" />
      <div className="ml-[10px]">
        <p className="text-md font-semibold">{title}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default CreateListItem;
