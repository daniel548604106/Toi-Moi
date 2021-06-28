import React from 'react';
import CardLayout from './CardLayout';
import Image from 'next/image';
import router from 'next/router';
const Friends = ({ friends }) => {
  return (
    <CardLayout
      title="Friends"
      buttonName="See All Friends"
      buttonLink="friends"
    >
      <h2 className="text-lg mb-3 text-gray-400">{`${friends.friends_total} ${
        friends.friends_total > 1 ? 'friends' : 'friend'
      }`}</h2>
      <div className="grid grid-cols-3 gap-2">
        {friends.friends_preview.map((friend) => (
          <span
            onClick={() => router.push(`/${friend.user.username}`)}
            className=""
          >
            <Image
              className="rounded-md cursor-pointer "
              width={150}
              height={150}
              src={friend.user.profileImage}
            />
            <p> {friend.user.name}</p>
          </span>
        ))}
      </div>
    </CardLayout>
  );
};

export default Friends;
