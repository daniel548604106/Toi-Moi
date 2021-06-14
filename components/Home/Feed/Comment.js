import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { dateDiff } from '../../../lib/dayjs';
const Comment = ({ comment }) => {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <Image
        src={comment.user.profileImage}
        width={30}
        height={30}
        className="rounded-full cursor-pointer "
      />
      <div className="w-full ml-[10px]">
        <div className=" py-2 px-3  rounded-lg bg-gray-100">
          <div className="flex items-center">
            <span
              onClick={() => router.push(`/${comment.user.username}`)}
              className="inline-block font-medium text-sm cursor-pointer hover:underline"
            >
              {comment.user.name}
            </span>
          </div>
          <p className="text-sm ">{comment.text}</p>
        </div>
        <div className="flex text-xs items-center py-1 text-gray-700">
          <span className="cursor-pointer">like</span>
          <span className="cursor-pointer ml-[5px]">reply</span>
          <span className="text-xs text-gray-600 ml-[5px]">
            {dateDiff(comment.date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
