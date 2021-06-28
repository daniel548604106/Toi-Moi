import router from 'next/router';
import React from 'react';

const NoPost = () => {
  return (
    <div className="text-center p-5 rounded-lg shadow-lg bg-secondary text-secondary">
      <h2 className="text-lg sm:text-2xl font-semibold">No more posts</h2>
      <p className="text-xs sm:text-sm">
        Add more friends to see more posts in your News Feed.
      </p>
      <button
        onClick={() => router.push('/friends')}
        className="bg-main text-sm sm:text-md text-white p-2 px-4 mt-3 rounded-lg"
      >
        Find friends
      </button>
    </div>
  );
};

export default NoPost;
