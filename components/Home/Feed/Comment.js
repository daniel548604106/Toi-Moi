import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { dateDiff } from '../../../lib/dayjs';
import { apiLikeComment, apiUnlikeComment } from '../../../api/index';
import { useSelector } from 'react-redux';
import { ThumbUpIcon } from '@heroicons/react/solid';
const Comment = ({ postId, comment }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const isCommentLiked =
    comment.likes.length > 0 &&
    comment.likes.filter((like) => like.user === userInfo._id).length > 0;
  const router = useRouter();
  const handleLikeComment = async (commentId) => {
    try {
      const { data } = await apiLikeComment(postId, commentId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlikeComment = async (commentId) => {
    try {
      const { data } = await apiUnlikeComment(postId, commentId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center">
      <Image
        src={comment.user.profileImage}
        width={30}
        height={30}
        className="rounded-full cursor-pointer "
      />
      <div className="w-full ml-[10px]">
        <div className="relative py-2 px-3  rounded-lg bg-gray-100">
          <div className="flex items-center">
            <span
              onClick={() => router.push(`/${comment.user.username}`)}
              className="inline-block font-medium text-sm cursor-pointer hover:underline"
            >
              {comment.user.name}
            </span>
          </div>
          <p className="text-sm ">{comment.text}</p>
          {comment.likes.length > 0 && (
            <div className="absolute flex items-center text-xs transform shadow-md translate-y-1/2 text-gray-400 bottom-0 right-0 rounded-full bg-white py-1 px-2">
              <span className="p-1 rounded-full bg-blue-600">
                <ThumbUpIcon className="h-3 text-white" />
              </span>
              <span className="ml-[3px]">{comment.likes.length}</span>
            </div>
          )}
        </div>
        <div className="flex text-xs items-center py-1 text-gray-700">
          {isCommentLiked ? (
            <span
              onClick={() => handleUnlikeComment(comment._id)}
              className="cursor-pointer text-blue-600"
            >
              like
            </span>
          ) : (
            <span
              onClick={() => handleLikeComment(comment._id)}
              className="cursor-pointer"
            >
              like
            </span>
          )}
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
