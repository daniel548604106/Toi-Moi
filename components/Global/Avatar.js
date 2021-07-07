import React, { useState } from 'react';
import Image from 'next/dist/client/image';
import genderAvatar from '../../utils/genderAvatar';
import router from 'next/router';
const Avatar = ({
  width = 60,
  height = 60,
  profileImage,
  layout = 'intrinsic',
  username,
  gender = 'other'
}) => {
  return (
    <Image
      onClick={() => router.push(`/${username || ''}`)}
      className="rounded-full object-cover cursor-pointer avatarFallback "
      width={width}
      layout={layout}
      height={height}
      src={profileImage || genderAvatar(gender)}
    />
  );
};

export default Avatar;
