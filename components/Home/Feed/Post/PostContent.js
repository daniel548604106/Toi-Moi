import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {
  setViewPostModalOpen,
  apiGetCurrentPost
} from '../../../../redux/slices/postSlice';
import useTranslation from 'next-translate/useTranslation';
import Loader from '../../../Global/Loader';
import { setNotification } from '../../../../redux/slices/globalSlice';
import { apiUpdatePost } from '../../../../api';
const PostContent = ({ post, isEditable, setEditable }) => {
  const [showMore, setShowMore] = useState(post.text?.length > 150);
  const [latestText, setLatestText] = useState(post.text || '');
  const [editedText, setEditedText] = useState(post.text || '');
  const [isLoading, setLoading] = useState(false);
  const [isEdited, setEdited] = useState(false);

  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const isViewPostModalOpen = useSelector(
    (state) => state.post.isViewPostModalOpen
  );
  const handleViewPost = async (postId) => {
    await dispatch(apiGetCurrentPost(postId));
    dispatch(setViewPostModalOpen(true));
  };
  const handleCancelEdit = () => {
    setEditable(false);
    setEditedText(post.text);
  };
  const handleUpdateEditedPost = async () => {
    if (!isEdited) return;
    setLoading(true);
    console.log('co');
    try {
      const { data } = await apiUpdatePost(post._id, editedText);
      console.log(data);
      setLatestText(editedText);
      setLoading(false);
      setEditable(false);
      dispatch(setNotification('Post updated!'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    editedText === post.text ? setEdited(false) : setEdited(true);
  }, [editedText]);
  return (
    <div className="space-y-2">
      {isEditable ? (
        <div>
          <textarea
            className="w-full focus:outline-none text-sm sm:text-md border rounded-lg p-2 min-h-[100px]  sm:min-h-[200px]"
            type="text"
            placeholder="Write something about the post"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={() => handleCancelEdit()}
              className="rounded-lg p-2 text-xs  sm:text-sm border"
            >
              Cancel
            </button>
            <button
              onClick={() => handleUpdateEditedPost()}
              className={`${
                isEdited ? 'bg-main text-white' : 'bg-button cursor-not-allowed'
              } rounded-lg p-2 text-xs  sm:text-sm  `}
            >
              {isLoading ? <Loader /> : 'Update'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className={`${showMore && 'line-clamp-3'} text-sm mb-2`}>
            {latestText}
          </p>
          {showMore && (
            <span
              onClick={() => setShowMore(false)}
              className="flex cursor-pointer items-center justify-end text-xs text-main"
            >
              {t('post.readMore')}
            </span>
          )}
        </div>
      )}
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
    </div>
  );
};

export default PostContent;
