import React, { useState, useEffect } from 'react';
import {
  AnnotationIcon,
  ThumbUpIcon as OutlineThumbUpIcon,
  ShareIcon
} from '@heroicons/react/outline';
import {
  ThumbUpIcon as SolidThumbUpIcon,
  DotsHorizontalIcon
} from '@heroicons/react/solid';
import Image from 'next/image';
import Popup from './Popup';
import { useSelector, useDispatch } from 'react-redux';
import { timeDiff } from '../../../lib/dayjs';
import { apiCommentPost, apiLikePost, apiUnlikePost } from '../../../api/index';
import {
  setLikesListOpen,
  apiGetLikesList,
  setViewPostModalOpen,
  apiGetCurrentPost
} from '../../../redux/slices/postSlice';
import { useRouter } from 'next/router';
import Comment from './Comment';
const Post = ({ post }) => {
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const isViewPostModalOpen = useSelector(
    (state) => state.post.isViewPostModalOpen
  );
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (text === '') return;
    try {
      const { data } = await apiCommentPost(post._id, text);
      const newComment = data;
      setComments((comments) => [newComment, ...comments]);
      setText('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikePost = async (id) => {
    try {
      console.log('clicked');
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

  const handleLikesListOpen = (postId) => {
    dispatch(setLikesListOpen(true));
    dispatch(apiGetLikesList(postId)).then((res) => {
      console.log(res);
    });
  };

  const handleViewPost = (postId) => {
    dispatch(apiGetCurrentPost(postId)).then((res) => {
      console.log('currentPost', res);
    });
    dispatch(setViewPostModalOpen(true));
  };

  const handleDirectToProfile = () => {
    router.push(`/${post.user.username}`);
  };
  const isLiked =
    likes.length > 0 &&
    likes.filter((like) => like.user._id === userInfo._id).length > 0;

  useEffect(() => {
    console.log(likes, isLiked);
  }, [likes]);
  return (
    <div className="rounded-xl shadow-md p-3  bg-white">
      <div className=" sm:p-3">
        <div className="flex justify-between  mb-[10px]">
          <div className="flex items-center">
            <Image
              onClick={() => handleDirectToProfile()}
              className="rounded-full  cursor-pointer"
              src={post.user.profileImage}
              width="40"
              height="40"
            />
            <div className="ml-[10px]">
              <p
                onClick={() => handleDirectToProfile()}
                className="flex items-center "
              >
                <span className="font-semibold hover:underline cursor-pointer">
                  {post.user.name}
                </span>
                {post.type === 'profileCover' && (
                  <span className=" ml-[5px] text-xs text-gray-600">
                    Changed profile cover
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-600 hover:underline cursor-pointer">
                {timeDiff(post.updatedAt)}
              </p>
            </div>
          </div>
          <span className="group p-2 relative rounded-full  hover:bg-gray-100">
            <DotsHorizontalIcon className="h-5 cursor-pointer text-gray-700 " />
            <div className="  hidden group-hover:block  z-40  absolute bottom-0 transform translate-y-full right-0 ">
              <Popup postId={post._id} />
            </div>
          </span>
        </div>
        <p className="text-sm">{post.text}</p>
      </div>
      {!isViewPostModalOpen && post.picUrl && (
        <div
          onClick={() => handleViewPost(post._id)}
          className="cursor-pointer relative  w-full rounded-md  bg-black"
        >
          <Image
            className="w-full object-scale-down"
            src={post.picUrl}
            width="100%"
            height="auto"
            layout="responsive"
          />
        </div>
      )}

      <div className="flex items-center justify-between  text-sm my-[10px]">
        {likes.length > 0 && (
          <div
            onClick={() => handleLikesListOpen(post._id)}
            className="flex items-center cursor-pointer hover:underline"
          >
            <span className="rounded-full p-1 bg-blue-600 text-white">
              <SolidThumbUpIcon className="h-2 " />
            </span>
            <span className="text-gray-600 ml-[3px] ">{likes.length}</span>
          </div>
        )}
        <div>
          {comments.length > 0 && (
            <span className="text-gray-600 cursor-pointer hover:underline">
              {comments.length}
              {comments.length === 1 ? ' comment' : ' comments'}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center  border-t p-1 sm:p-3">
        {isLiked ? (
          <div className="rounded-md  flex items-center justify-center py-2 hover:bg-gray-100 flex-1  cursor-pointer text-blue-600">
            <SolidThumbUpIcon
              onClick={() => handleUnlikePost(post._id)}
              className="h-4 "
            />
            <span className="text-sm sm:text-md ml-[10px]">Like</span>
          </div>
        ) : (
          <div
            onClick={() => handleLikePost(post._id)}
            className="rounded-md flex items-center justify-center  p-2 hover:bg-gray-100 flex-1  cursor-pointer text-gray-400"
          >
            <OutlineThumbUpIcon className="h-4  " />
            <span className="text-sm sm:text-md ml-[10px]"> Like</span>
          </div>
        )}
        <div className="rounded-md  flex items-center justify-center p-2  hover:bg-gray-100 flex-1  cursor-pointer text-gray-400">
          <AnnotationIcon className="h-4  " />
          <span className="text-sm sm:text-md ml-[10px]">Comment</span>
        </div>
        <div className="rounded-md flex items-center justify-center  p-2 hover:bg-gray-100 flex-1  cursor-pointer text-gray-400">
          <ShareIcon className="h-4 " />
          <span className="text-sm sm:text-md ml-[10px]">Share</span>
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
            <Comment
              comments={comments}
              setComments={setComments}
              postId={post._id}
              comment={comment}
            />
          </div>
        ))}
      {comments.length > 2 && (
        <span className="inline-block text-xs cursor-pointer">查看更多</span>
      )}
    </div>
  );
};

export default Post;
