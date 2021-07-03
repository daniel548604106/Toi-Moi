import React from 'react';
import Image from 'next/dist/client/image';
import genderAvatar from '../../utils/genderAvatar';
import router from 'next/router';
const Avatar = ({
  width = 60,
  height = 60,
  profileImage,
  username,
  gender = 'other'
}) => {
  return (
    <Image
      onClick={() => router.push(`/${username || ''}`)}
      className="rounded-full  cursor-pointer"
      width={width}
      height={height}
      src={profileImage || genderAvatar(gender)}
    />
  );
};

export default Avatar;
