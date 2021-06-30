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
import genderAvatar from '../../../utils/genderAvatar';
import useTranslation from 'next-translate/useTranslation';
const Post = ({ post }) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const userInfo = useSelector((state) => state.user.userInfo);
  const isViewPostModalOpen = useSelector(
    (state) => state.post.isViewPostModalOpen
  );
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [isLiked, setLiked] = useState(
    likes.length > 0 &&
      likes.filter((like) => like.user === userInfo._id).length > 0
  );
  const [text, setText] = useState('');
  const [commentLength, setCommentLength] = useState(2);
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
      const { data } = await apiLikePost(id);
      setLiked(true);
      setLikes([...likes, { user: id }]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlikePost = async (id) => {
    try {
      const { data } = await apiUnlikePost(id);
      setLiked(false);
      let indexOf = likes.map((like) => like.user).indexOf(id);
      setLikes(likes.splice(indexOf, 1));
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

  const handleViewPost = async (postId) => {
    await dispatch(apiGetCurrentPost(postId));
    dispatch(setViewPostModalOpen(true));
  };

  const handleDirectToProfile = () => {
    router.push(`/${post.user.username}`);
  };

  return (
    <div className="rounded-xl shadow-md text-primary p-3 bg-secondary">
      <div className=" sm:p-3">
        <div className="flex justify-between  mb-[10px]">
          <div className="flex items-center">
            <Image
              onClick={() => handleDirectToProfile()}
              className="rounded-full object-cover  cursor-pointer"
              src={post.user.profileImage || genderAvatar(post.user.gender)}
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
                    {t('post.changedProfileCover')}
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-600 hover:underline cursor-pointer">
                {timeDiff(post.updatedAt).split(' ')[0]}
                <span className={router.locale === 'zh-tw' ? 'mx-0' : 'mx-1'}>
                  {t(timeDiff(post.updatedAt).split(' ')[1])}
                </span>
                {t('ago')}
              </p>
            </div>
          </div>
          <button className="group focus:outline-none p-2 relative rounded-full  hover:bg-gray-100">
            <DotsHorizontalIcon className="h-5 cursor-pointer text-gray-700 " />
            <div className="group-focus:block  hidden  z-20  absolute bottom-0 transform translate-y-full right-0 ">
              <Popup user={post.user} postId={post._id} />
            </div>
          </button>
        </div>
        <p className="text-sm">{post.text}</p>
      </div>
      {!isViewPostModalOpen && post.picUrl && (
        <div className="imageContainer">
          <Image
            src={post.picUrl}
            placeholder="blur"
            layout="fill"
            className="image"
          />
        </div>
      )}

      <div className="flex items-center justify-between  text-sm my-[10px]">
        {likes.length > 0 && (
          <div
            onClick={() => handleLikesListOpen(post._id)}
            className="flex items-center cursor-pointer hover:underline"
          >
            <span className="rounded-full p-1 bg-main text-white">
              <SolidThumbUpIcon className="h-3 " />
            </span>
            <span className="text-gray-600 ml-[3px] ">{likes.length}</span>
          </div>
        )}
        <div>
          {comments.length > 0 && (
            <span className="text-gray-600 lowercase cursor-pointer hover:underline">
              {comments.length}
              {comments.length === 1
                ? t('post.commentTotal')
                : t('post.commentTotal')}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center  border-t p-1 sm:p-3">
        {isLiked ? (
          <div
            onClick={() => handleUnlikePost(post._id)}
            className="rounded-md  flex items-center justify-center p-2 hover:bg-gray-100 flex-1  cursor-pointer text-main"
          >
            <SolidThumbUpIcon className="h-4 " />
            <span className="text-sm sm:text-md ml-[10px]">
              {t('post.like')}
            </span>
          </div>
        ) : (
          <div
            onClick={() => handleLikePost(post._id)}
            className="rounded-md flex items-center justify-center  p-2 hover:bg-gray-100 flex-1  cursor-pointer text-gray-400"
          >
            <OutlineThumbUpIcon className="h-4  " />
            <span className="text-sm sm:text-md ml-[10px]">
              {t('post.like')}
            </span>
          </div>
        )}
        <div className="rounded-md  flex items-center justify-center p-2  hover:bg-gray-100 flex-1  cursor-pointer text-gray-400">
          <AnnotationIcon className="h-4  " />
          <span className="text-sm sm:text-md ml-[10px]">
            {t('post.comment')}
          </span>
        </div>
        <div className="rounded-md flex items-center justify-center  p-2 hover:bg-gray-100 flex-1  cursor-pointer text-gray-400">
          <ShareIcon className="h-4 " />
          <span className="text-sm sm:text-md ml-[10px]">
            {t('post.share')}
          </span>
        </div>
      </div>
      <div className="p-1 flex items-center">
        <Image
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
          width={30}
          height={30}
          className="rounded-full "
        />
        <form className="w-full" onSubmit={(e) => handleSubmitComment(e)}>
          <input
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            placeholder={t('post.addComment')}
            className="border focus:outline-none   text-sm ml-[10px] rounded-full w-full px-[10px] py-[10px]"
          />
        </form>
      </div>
      {comments.length > 0 &&
        comments.slice(0, commentLength).map((comment) => (
          <div key={comment._id} className=" p-1 w-full">
            <Comment
              t={t}
              comments={comments}
              setComments={setComments}
              postId={post._id}
              comment={comment}
            />
          </div>
        ))}
      {comments.length > 2 && commentLength < comments.length && (
        <span
          onClick={() => setCommentLength(commentLength + 5)}
          className="inline-block text-xs cursor-pointer"
        >
          {t('seeMore')}
        </span>
      )}
    </div>
  );
};

export default Post;
