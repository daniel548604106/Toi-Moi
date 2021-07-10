import React from 'react';
import Avatar from '../Global/Avatar';
import { XIcon } from '@heroicons/react/outline';
const PostNotification = ({
  newNotification: { profileImage, postByUserId, username, name }
}) => {
  return (
    <div className="rounded-lg border bg-secondary p-2 cursor-pointer flex items-center space-x-3 ">
      <XIcon className="h-5" />
      <Avatar profileImage={profileImage} username={username} />
      <p>
        <span>{name}</span> liked your post
      </p>
    </div>
  );
};

export default PostNotification;
