import React, { useState } from 'react';
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
  const [src, setSrc] = useState('/images/other.png');
  return (
    <Image
      onClick={() => router.push(`/${username || ''}`)}
      className="rounded-full object-cover cursor-pointer"
      width={width}
      height={height}
      src={src}
      onLoad={() => setSrc(profileImage || genderAvatar(gender))}
    />
  );
};

export default Avatar;
