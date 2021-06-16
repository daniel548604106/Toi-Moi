import React from 'react';
import Stories from './Stories';
import InputBox from './InputBox';
import Post from './Post';
import InfiniteScroll from 'react-infinite-scroll-component';

const Index = ({ posts }) => {
  return (
    <div className=" w-full  sm:px-5 sm:mx-0 xl:px-16">
      <div className="mb-[15px] sm:mb-[30px]">
        <Stories />
      </div>
      <div className="mb-[15px] sm:mb-[20px]">
        <InputBox />
      </div>
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
