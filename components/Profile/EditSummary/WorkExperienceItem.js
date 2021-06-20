import React from 'react';
import { PencilIcon } from '@heroicons/react/solid';

const WorkExperienceItem = () => {
  return (
    <div className="flex  items-center justify-between">
      <span>gekko</span>
      <PencilIcon className="h-6 cursor-pointer" />
    </div>
  );
};

export default WorkExperienceItem;
