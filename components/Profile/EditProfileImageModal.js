import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { XIcon } from '@heroicons/react/outline';
import { setEditProfileImageOpen } from '../../redux/slices/userSlice';
const EditProfileImageModal = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const profileImageToUpdate = useSelector(
    (state) => state.user.profileImageToUpdate
  );

  return (
    <div className="rounded-lg relative max-w-[600px] w-full bg-white shadow-xl">
      <span
        onClick={() => dispatch(setEditProfileImageOpen(false))}
        className="absolute cursor-pointer top-[8px] right-[8px] rounded-full bg-gray-100 p-2"
      >
        <XIcon className="h-6" />
      </span>
      <div className="py-3 border-b flex text-lg font-semibold items-center justify-center">
        Update Profile Image
      </div>
      <div className="p-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:border-blue-600 w-full"
          placeholder="Description"
        ></textarea>
        <div className="p-3 relative w-full h-[500px] ">
          {profileImageToUpdate && (
            <Image
              className="object-scale-down bg-gray-100 rounded-md"
              src={profileImageToUpdate}
              layout="fill"
            />
          )}
        </div>
      </div>
      <div className="p-3 border-t flex items-center justify-end">
        <button
          onClick={() => dispatch(setEditProfileImageOpen(false))}
          className="rounded-md p-2 text-sm px-4 hover:shadow-lg"
        >
          Cancel
        </button>
        <button className="rounded-md p-2 text-sm px-4 bg-blue-600 text-white ml-[10px]">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfileImageModal;
