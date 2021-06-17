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
      <div className="flex">
        {friends.friends_preview.map((friend) => (
          <div
            onClick={() => router.push(`/${friend.user.username}`)}
            className=""
          >
            <Image
              className="rounded-md cursor-pointer "
              width={200}
              height={200}
              src={friend.user.profileImage}
            />
            <p> {friend.user.name}</p>
          </div>
        ))}
      </div>
    </CardLayout>
  );
};

export default Friends;
