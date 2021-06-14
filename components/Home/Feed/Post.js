import React, { useState } from 'react';
import {
  AnnotationIcon,
  ThumbUpIcon,
  ShareIcon
} from '@heroicons/react/outline';
import {
  ThumbUpIcon as SolidThumbUpIcon,
  DotsHorizontalIcon
} from '@heroicons/react/solid';
import Image from 'next/image';
import Popup from './Popup';
import { useSelector } from 'react-redux';
import { apiCommentPost, apiLikePost, apiUnlikePost } from '../../../api/index';
import Comment from './Comment';
const Post = ({ post }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (text === '') return;
    try {
      const res = await apiCommentPost(post._id, text);
      console.log(res);
      setText('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikePost = async (id) => {
    try {
      const { data } = await apiLikePost(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlikePost = async (id) => {
    try {
      const { data } = await apiUnlikePost(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user._id === userInfo._id).length > 0;
  return (
    <div className="rounded-xl shadow-md p-3  bg-white">
      <div className="p-3">
        <div className="flex justify-between cursor-pointer items-center mb-[10px]">
          <div className="flex items-center">
            <Image
              className="rounded-full"
              src={post.user.profileImage}
              width="30"
              height="30"
            />
            <span className="ml-[10px] font-semibold">{post.user.name}</span>
          </div>
          <span className="p-2 relative rounded-full  hover:bg-gray-100">
            <DotsHorizontalIcon className="h-5 cursor-pointer text-gray-700 " />
            <div className="group-hover:bg-red-400 z-40  absolute bottom-0 transform translate-y-full right-0 ">
              <Popup postId={post._id} />
            </div>
          </span>
        </div>
        <p className="text-sm">{post.text}</p>
        {likes.length > 0 && (
          <p className=" hover:underline cursor-pointer text-sm text-blue-600 my-[10px]">
            <span className="">
              {likes.length} {likes.length > 1 ? 'likes' : 'like'}
            </span>
          </p>
        )}
      </div>
      {post.picUrl && (
        <div className="cursor-pointer relative h-56 md:h-96 bg-white">
          <Image src={post.picUrl} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="flex items-center  border-t p-3">
        {isLiked ? (
          <div className="rounded-md  flex items-center justify-center py-2 hover:bg-gray-100 flex-1  cursor-pointer text-gray-400">
            <SolidThumbUpIcon
              onClick={() => handleUnlikePost(post._id)}
              className="h-6 rounded-md hover:bg-gray-100 flex-1  text-blue-600 cursor-pointer"
            />
          </div>
        ) : (
          <div className="rounded-md flex items-center justify-center  py-2 hover:bg-gray-100 flex-1  cursor-pointer text-gray-400">
            <ThumbUpIcon
              onClick={() => handleLikePost(post._id)}
              className="h-6  rounded-md hover:bg-gray-100 flex-1 cursor-pointer text-gray-400"
            />
          </div>
        )}
        <div className="rounded-md  flex items-center justify-center py-2 hover:bg-gray-100 flex-1  cursor-pointer text-gray-400">
          <AnnotationIcon className="h-6  " />
        </div>
        <div className="rounded-md flex items-center justify-center  py-2 hover:bg-gray-100 flex-1  cursor-pointer text-gray-400">
          <ShareIcon className="h-6  rounded-md hover:bg-gray-100 flex-1  cursor-pointer text-gray-400" />
        </div>
      </div>
      <div className="p-1 flex items-center">
        <Image
          src={userInfo.profileImage}
          width={30}
          height={30}
          className="rounded-full "
        />
        <form className="w-full" onSubmit={(e) => handleSubmitComment(e)}>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder="Add Comment..."
            className="border focus:outline-none   text-sm ml-[10px] rounded-full w-full px-[10px] py-[10px]"
          />
        </form>
      </div>
      {comments.length > 0 &&
        comments.slice(0, 2).map((comment) => (
          <div key={comment._id} className=" p-1 w-full">
            <Comment postId={post._id} comment={comment} />
          </div>
        ))}
      {comments.length > 2 && (
        <span className="inline-block text-xs cursor-pointer">查看更多</span>
      )}
    </div>
  );
};

export default Post;
