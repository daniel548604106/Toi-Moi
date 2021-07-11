import React, { useEffect, useState } from 'react';
import { apiGetSavedPosts } from '../../api';
import SavedCard from '../../components/Saved/SavedCard';
import Image from 'next/image';
const Index = () => {
  const [savedPosts, setSavedPosts] = useState(null);
  const handleGetSavedPosts = async () => {
    try {
      const { data } = await apiGetSavedPosts();
      setSavedPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveSavedPost = (id) => {
    console.log(id, savedPosts);
    setSavedPosts(savedPosts.filter((post) => post.post._id !== id));
  };
  useEffect(() => {
    handleGetSavedPosts();
  }, []);
  useEffect(() => {
    console.log(savedPosts);
  }, [savedPosts]);
  return (
    <div className="w-full p-2 max-w-[600px] mx-auto py-3 sm:py-10 ">
      {savedPosts?.length > 0 ? (
        <div>
          <h2 className="text-lg sm:text-2xl font-semibold">Saved Posts</h2>
          <div>
            {savedPosts.map((post) => (
              <SavedCard
                key={post._id}
                post={post.post}
                type={post.type}
                handleRemoveSavedPost={handleRemoveSavedPost}
                publisher={post.publisher}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-[60px] w-full flex  flex-col items-center justify-center">
          <Image src="/images/empty-bookmark.svg" width="100" height="100" />
          <h2 className="text-lg sm:text-2xl font-semibold mt-5">
            {' '}
            No Saved Post
          </h2>
        </div>
      )}
    </div>
  );
};

export default Index;
