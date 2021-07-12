import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PostContent from './PostContent';
import PostActions from './PostActions';
import PostHeader from './PostHeader';
import PostComments from './PostComments';
import PostStatus from './PostStatus';
import PostCommentInput from './PostCommentInput';
import useTranslation from 'next-translate/useTranslation';
const Post = ({ post, socket, deletePost }) => {
  const { t } = useTranslation('common');
  const [isEditable, setEditable] = useState(false);
  const [isCommentShow, setCommentShow] = useState(post.comments.length > 0);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [commentLength, setCommentLength] = useState(2);

  return (
    <div className="rounded-xl shadow-md text-primary p-3 bg-secondary">
      <PostHeader
        setEditable={setEditable}
        post={post}
        deletePost={deletePost}
      />
      <PostContent
        setEditable={setEditable}
        isEditable={isEditable}
        post={post}
      />
      <PostStatus
        setCommentShow={setCommentShow}
        isCommentShow={isCommentShow}
        likes={likes}
        comments={comments}
        post={post}
      />
      <PostActions
        setCommentShow={setCommentShow}
        socket={socket}
        likes={likes}
        setLikes={setLikes}
        post={post}
      />

      {isCommentShow && (
        <div>
          <PostCommentInput />
          {comments.length > 0 &&
            comments.slice(0, commentLength).map((comment) => (
              <div key={comment._id} className=" p-1 w-full">
                <PostComments
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
      )}
    </div>
  );
};

export default Post;
