import React from 'react';
import {
  AnnotationIcon,
  ThumbUpIcon,
  ShareIcon
} from '@heroicons/react/outline';
import Image from 'next/image';
const Post = ({ post }) => {
  return (
    <div className="rounded-xl shadow-md p-3  bg-white">
      <div className="p-3">
        <div className="flex cursor-pointer items-center mb-[10px]">
          <Image
            className="rounded-full"
            src={post.user.profileImage}
            width="30"
            height="30"
          />
          <span className="ml-[10px] font-semibold">{post.user.name}</span>
        </div>
        <p className="text-sm">{post.text}</p>
      </div>
      {post.picUrl && (
        <div className="relative h-56 md:h-96 bg-white">
          <Image src={post.picUrl} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="flex items-center justify-evenly border-t p-3">
        <ThumbUpIcon className="h-6 cursor-pointer text-gray-400" />
        <AnnotationIcon className="h-6 cursor-pointer text-gray-400" />
        <ShareIcon className="h-6 cursor-pointer text-gray-400" />
      </div>
    </div>
  );
};

export default Post;
