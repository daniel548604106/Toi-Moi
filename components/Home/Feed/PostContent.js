import React, { useState } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {
  setViewPostModalOpen,
  apiGetCurrentPost
} from '../../../redux/slices/postSlice';
import useTranslation from 'next-translate/useTranslation';
const PostContent = ({ post, isEditable }) => {
  const [showMore, setShowMore] = useState(post.text?.length > 100);
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const isViewPostModalOpen = useSelector(
    (state) => state.post.isViewPostModalOpen
  );
  const handleViewPost = async (postId) => {
    await dispatch(apiGetCurrentPost(postId));
    dispatch(setViewPostModalOpen(true));
  };
  return (
    <div className="space-y-2">
      {isEditable ? (
        <textarea type="text" value={post.text} />
      ) : (
        <div>
          <p className={`${showMore && 'line-clamp-3'} text-sm mb-2`}>
            {post.text}
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
