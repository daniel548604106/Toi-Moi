import React from 'react';

import Post from './Post';

const Index = ({ posts }) => {
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="mb-[15px] ">
            <Post post={post} />
          </div>
        ))}
    </div>
  );
};

export default Index;
