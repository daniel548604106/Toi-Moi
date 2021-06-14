import React from 'react';
import Stories from './Stories';
import InputBox from './InputBox';
import Post from './Post';
const Index = ({ posts }) => {
  return (
    <div className="flex-grow sm:px-5 sm:mx-0 xl:px-10 xl:mx-10">
      <div className="mb-[30px]">
        <Stories />
      </div>
      <div className="mb-[30px]">
        <InputBox />
      </div>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="mb-[30px]">
            <Post post={post} />
          </div>
        ))}
    </div>
  );
};

export default Index;
