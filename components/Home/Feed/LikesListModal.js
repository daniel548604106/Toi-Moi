import React from 'react';
import { XIcon, ThumbUpIcon, UserAddIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { setLikesListOpen } from '../../../redux/slices/postSlice';
const LikesListModal = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const likesList = useSelector((state) => state.post.likesList);
  const dispatch = useDispatch();

  return (
    <div className="rounded-lg relative bg-white w-full max-w-[600px]   p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ThumbUpIcon className="h-6 text-blue-600 cursor-pointer" />
          <span className="ml-[5px] text-sm text-gray-600">2</span>
        </div>
        <span
          onClick={() => dispatch(setLikesListOpen(false))}
          className="cursor-pointer p-2 bg-gray-100 rounded-full"
        >
          <XIcon className="h-6" />
        </span>
      </div>
      <hr className="my-[10px]" />
      <div className="h-full max-h-[50vh] overflow-y-auto">
        {likesList.length > 0 &&
          likesList.map((like) => (
            <div
              onClick={() => router.push(`/${like.user.username}`)}
              key={like._id}
              className="flex items-center justify-between p-2"
            >
              <div className="flex items-center">
                <Image
                  src={like.user.profileImage}
                  width={50}
                  height={50}
                  layout="fixed"
                  className="rounded-full cursor-pointer "
                />
                <span className="ml-[15px] cursor-pointer hover:underline">
                  {like.user.name}
                </span>
              </div>
              <button className="rounded-md p-2 px-3 flex items-center bg-gray-200">
                <UserAddIcon className="h-6" />
                <span className="ml-[5px]">Add friend</span>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LikesListModal;
