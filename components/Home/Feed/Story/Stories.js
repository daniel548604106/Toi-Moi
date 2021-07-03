import React, { useState } from 'react';
import StoryCard from './StoryCard';
import Image from 'next/image';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';
import genderAvatar from '../../../../utils/genderAvatar';
import { apiUploadStory } from '../../../../api/index';
const Stories = () => {
  const [videoFile, setVideoFile] = useState('');
  const userInfo = useSelector((state) => state.user.userInfo);
  const uploadStory = async () => {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      const res = await axios.post(
        'https://api.vimeo.com/me/videos',
        {
          upload: {
            approach: 'tus',
            size: videoFile.size
          }
        },
        {
          headers: {
            authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
            'content-type': 'application/json',
            accept: 'application/vnd.vimeo.*+json;version=3.4'
          }
        }
      );
      console.log(res);
      // await apiUploadStory(formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full mt-2 space-x-1   overflow-hidden ">
      <div
        onClick={() => uploadStory()}
        className="relative  flex-shrink-0   w-1/3 sm:w-1/4 2xl:w-1/5  rounded-md transition duration-75 cursor-pointer hover:opacity-80 "
      >
        <img
          className="h-30 sm:h-44 w-full relative object-cover rounded-3xl rounded-b-none"
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
        />
        <div className="relative text-sm sm:text-md px-1 py-5 rounded-b-3xl text-center bg-secondary text-secondary">
          Create Story
          <span className="rounded-full p-1 absolute z-10 -translate-y-1/2 top-0 text-white left-1/2 transform -translate-x-1/2 border-4 border-white bg-main ">
            <PlusIcon className="h-6 " />
          </span>
        </div>
      </div>

      {/* {videoFile ? (
        <div>
          <video width="400" controls>
            <source src={window.URL.createObjectURL(videoFile)} />
          </video>
          <button
            onClick={() => uploadStory()}
            className="rounded-lg p-2 bg-main text-white"
          >
            Upload
          </button>
          <button
            className="rounded-lg p-2 bg-blue-600 text-white"
            onClick={() => setVideoFile('')}
          >
            Clear
          </button>
        </div>
      ) : (
        <form>
          <input
            onChange={(e) => setVideoFile(e.target.files[0])}
            type="file"
            accept="video/*"
          />
        </form>
      )} */}

      {/* {stories.map((story) => (
        <StoryCard
          key={story.name}
          name={story.name}
          src={story.src}
          profile={story.profile}
        />
      ))} */}
    </div>
  );
};

export default Stories;
