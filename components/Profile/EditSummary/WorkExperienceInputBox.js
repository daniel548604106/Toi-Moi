import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
const WorkExperienceInputBox = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className="">
      <form className="space-y-2 ">
        <input
          className="border p-3 w-full rounded-md "
          type="text"
          placeholder="Company"
        />
        <input
          className="border p-3 w-full rounded-md "
          type="text"
          placeholder="Job Title"
        />
        <input
          className="border p-3 w-full rounded-md "
          type="text"
          placeholder="City"
        />
        <input
          className="border min-h-[100px] p-3 w-full rounded-md "
          type="text"
          placeholder="Description"
        />
      </form>
      <div className="my-2 flex items-center justify-between">
        <p className="text-lg font-semibold ">Period</p>
        <div className="flex items-center">
          <input
            type="checkbox"
            onChange={() => setChecked(!checked)}
            checked={checked}
            className="w-[20px] h-[20px]"
          />
          <p className="ml-[10px] font-semibold text-sm">
            Currently working here
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>From</span>
        <button className="flex text-sm items-center p-2 px-4 rounded-md border text-gray-600 ">
          Year
          <ChevronDownIcon className="h-6" />
        </button>
      </div>
      <div className="my-5 flex items-center">
        <button className="rounded-md bg-blue-600 text-white p-2 w-full flex items-center justify-center">
          Save
        </button>
        <button className="rounded-md w-[200px] p-2 ml-[10px] border flex items-center justify-center">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceInputBox;
