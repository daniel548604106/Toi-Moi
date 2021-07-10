import React, { useState, useEffect, useRef } from 'react';
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
import Avatar from '../../Global/Avatar';
import Popup from './Popup';
import useClickOutside from '../../../hooks/useClickOutside';
import { useSelector, useDispatch } from 'react-redux';
import { timeDiff } from '../../../lib/dayjs';
import { apiCommentPost, apiLikePost, apiUnlikePost } from '../../../api/index';
import {
  setLikesListOpen,
  apiGetLikesList,
  setViewPostModalOpen,
  apiGetCurrentPost,
  getSavedPosts
} from '../../../redux/slices/postSlice';
import router from 'next/router';
import Comment from './Comment';
import useTranslation from 'next-translate/useTranslation';
import { setNotification } from '../../../redux/slices/globalSlice';
const Post = ({ post, socket, deletePost }) => {
  const { t } = useTranslation('common');
  const elRef = useRef();
  const [isPopupShow, setPopupShow] = useState(false);
  useClickOutside(elRef, () => setPopupShow(false));

  const userInfo = useSelector((state) => state.user.userInfo);
  const isViewPostModalOpen = useSelector(
    (state) => state.post.isViewPostModalOpen
  );
  const [commentInputShow, setCommentInputShow] = useState(
    post.comments.length > 0
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
      dispatch(setNotification('Comment posted!'));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTogglePopup = () => {
    dispatch(getSavedPosts());
    setPopupShow(!isPopupShow);
  };
  const handleLikePost = async (id) => {
    if (socket.current) {
      socket.current.emit('likePost', { postId: id, userId: userInfo._id });
      socket.current.on('postLiked', () => {
        console.log('success');
        setLikes([...likes, { _id: id, user: userInfo._id }]);
        setLiked(true);
      });
    } else {
      try {
        // Still call the api if socket fails
        const { data } = await apiLikePost(id);
        setLikes([...likes, { user: id }]);
        setLiked(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log('likes', likes);
  }, [likes]);

  const handleUnlikePost = async (id) => {
    if (socket.current) {
      socket.current.emit('unlikePost', { postId: id, userId: userInfo._id });
      socket.current.on('postUnliked', () => {
        console.log('unliked');
        setLikes(likes.filter((like) => like.user !== userInfo._id));
        setLiked(false);
      });
    } else {
      try {
        // Still call the api if socket fails
        const { data } = await apiUnlikePost(id);
        setLikes(likes.filter((like) => like.user !== id));
        setLiked(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLikesListOpen = (postId) => {
    dispatch(setLikesListOpen(true));
    dispatch(apiGetLikesList(postId));
  };
  const handleDirectToProfile = () => {
    router.push(`/${post.user.username}`);
  };

  const handleViewPost = async (postId) => {
    await dispatch(apiGetCurrentPost(postId));
    dispatch(setViewPostModalOpen(true));
  };

  return (
    <div className="rounded-xl shadow-md text-primary p-3 bg-secondary">
      <div className=" sm:p-3">
        <div className="flex justify-between  mb-[10px]">
          <div className="flex items-center">
            <span>
              <Avatar
                width="40"
                height="40"
                username={post.user.username}
                profileImage={post.user.profileImage}
                gender={post.user.gender}
              />
            </span>
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
                {timeDiff(post.createdAt).split(' ')[0]}
                <span className={router.locale === 'zh-tw' ? 'mx-0' : 'mx-1'}>
                  {t(timeDiff(post.createdAt).split(' ')[1])}
                </span>
                {t('ago')}
              </p>
            </div>
          </div>
          <div
            ref={elRef}
            className="focus:outline-none p-2 relative rounded-full  hover:bg-gray-100"
          >
            <DotsHorizontalIcon
              onClick={() => handleTogglePopup()}
              className="h-5 cursor-pointer text-gray-700 "
            />
            {isPopupShow && (
              <div className="z-20  absolute bottom-0 transform translate-y-full right-0 ">
                <Popup
                  setPopupShow={setPopupShow}
                  deletePost={deletePost}
                  user={post.user}
                  postId={post._id}
                />
              </div>
            )}
          </div>
        </div>
        <p className="text-sm">{post.text}</p>
      </div>
      {!isViewPostModalOpen && post.picUrl && (
        <div
          onClick={() => handleViewPost(post._id)}
          className="imageContainer cursor-pointer"
        >
          <Image
            src={post.picUrl}
            layout="fill"
            className="image rounded-lg "
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
        <div
          onClick={() => setCommentInputShow(true)}
          className="rounded-md  flex items-center justify-center p-2  hover:bg-gray-100 flex-1  cursor-pointer text-gray-400"
        >
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
      {commentInputShow && (
        <div className="p-1 flex items-center">
          <Avatar
            width="30"
            height="30"
            username={userInfo.username}
            profileImage={userInfo.profileImage}
            gender={userInfo.gender}
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
      )}
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
