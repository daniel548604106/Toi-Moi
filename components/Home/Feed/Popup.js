import React, { useState, useEffect } from 'react';
import { TrashIcon, BookmarkIcon } from '@heroicons/react/outline';
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/solid';
import { apiDeletePost } from '../../../api/index';
import { useSelector, useDispatch } from 'react-redux';
import { apiPostNewSavedPost, apiDeleteSavedPost } from '../../../api/index';
import router from 'next/router';
import { setNotification } from '../../../redux/slices/globalSlice';
import { getSavedPosts } from '../../../redux/slices/postSlice';
const Popup = ({ setPopupShow, postId, user, deletePost }) => {
  const dispatch = useDispatch();
  const { savedPosts } = useSelector((state) => state.post);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isSaved, setSaved] = useState(
    savedPosts.map((saved) => saved.post._id).includes(postId)
  );
  useEffect(() => {
    console.log(savedPosts, isSaved, 'saved');
  }, [savedPosts]);
  const handleDeletePost = async () => {
    try {
      const { data } = await apiDeletePost(postId);
      // dispatch(getSavedPosts())
      console.log(data);
      deletePost(postId);
      dispatch(setNotification('Post deleted'));
    } catch (error) {
      console.log(error);
    }
  };
  const handleSavePost = async () => {
    try {
      if (isSaved) {
        await apiDeleteSavedPost(postId);
        dispatch(setNotification('Remove saved post'));
      } else {
        const { data } = await apiPostNewSavedPost({
          type: 'post',
          postId,
          publisherId: user._id
        });
        dispatch(setNotification('Post saved'));
        console.log(data);
      }
      dispatch(getSavedPosts());
      setSaved(!isSaved);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={() => setPopupShow(false)}
      className="shadow-lg p-2  rounded-md  bg-secondary text-secondary"
    >
      {user.username === userInfo.username && (
        <div
          onClick={() => handleDeletePost()}
          className="cursor-pointer rounded-md flex items-center hover:bg-gray-100 py-2 px-3"
        >
          <TrashIcon className="h-6" />
          <span className="ml-[10px] text-sm whitespace-nowrap">
            Move to trash can
          </span>
        </div>
      )}
      <div
        onClick={() => handleSavePost()}
        className={`cursor-pointer rounded-md flex items-center hover:bg-gray-100 py-2 px-3  ${
          isSaved && 'text-main'
        }`}
      >
        {isSaved ? (
          <SolidBookmarkIcon className="h-6" />
        ) : (
          <BookmarkIcon className="h-6" />
        )}
        <span className={`ml-[10px] text-sm whitespace-nowrap`}>
          {isSaved ? 'Saved' : 'Save post'}
        </span>
      </div>
    </div>
  );
};

export default Popup;
