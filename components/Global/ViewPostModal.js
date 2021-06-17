import React from 'react';
import { XIcon } from '@heroicons/react/outline';
import Post from '../Home/Feed/Post';
import { useDispatch, useSelector } from 'react-redux';
import { setViewPostModalOpen } from '../../redux/slices/postSlice';
import Image from 'next/image';
const ViewPostModal = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.currentPost);
  return (
    <div className="flex flex-col lg:flex-row  fixed top-0 left-0 w-screen h-screen z-50">
      <div
        onClick={() => dispatch(setViewPostModalOpen(false))}
        className="absolute z-50 top-3 left-3 p-2 rounded-full bg-gray-200"
      >
        <XIcon className="cursor-pointer h-6" />
      </div>
      <div className="w-full h-[500px] lg:h-auto relative  bg-black">
        <Image className="object-scale-down" src={post.picUrl} layout="fill" />
      </div>
      <div className="w-full h-full overflow-y-scroll lg:w-[600px] bg-white">
        {<Post post={post} />}
      </div>
    </div>
  );
};

export default ViewPostModal;
