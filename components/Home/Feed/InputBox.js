import React, { useRef, useState } from 'react';
import { VideoCameraIcon, CameraIcon } from '@heroicons/react/solid';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  setPostInputBoxOpen,
  setImageToPost
} from '../../../redux/slices/postSlice';
import genderAvatar from '../../../utils/genderAvatar';
import useTranslation from 'next-translate/useTranslation';
const InputBox = () => {
  const { t } = useTranslation('common');
  const filePickerRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleUploadImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      // Asynchronous function , read the file as an URL
      reader.readAsDataURL(e.target.files[0]);
    }
    // When it comes back , it comes back as a result
    reader.onload = (readerEvent) => {
      dispatch(setImageToPost(readerEvent.target.result));
    };
    dispatch(setPostInputBoxOpen(true));
  };

  return (
    <div className="w-full p-3 shadow-md font-medium rounded-xl bg-secondary text-secondary">
      <div className="flex items-center w-full space-x-2 mb-3">
        <img
          onClick={() => router.push(`/${userInfo.username}`)}
          className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full object-cover cursor-pointer"
          src={userInfo.profileImage || genderAvatar(userInfo.gender)}
        />
        <div
          onClick={() => dispatch(setPostInputBoxOpen(true))}
          className="bg-button text-primary cursor-pointer flex-1 text-left  rounded-full p-2 pl-4 hover:bg-gray-200 text-sm sm:text-md"
        >
          {`${userInfo.name} ,`} {t('post.whatAreYouThinking')}
        </div>
      </div>
      <hr className="my-2 " />
      <div className="flex justify-evenly p-1 ">
        <div className="inputIcon">
          <VideoCameraIcon className="h-5 mb-2 sm:mb-0  sm:h-6 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-md whitespace-nowrap">
            {t('post.liveStream')}
          </p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-5 mb-2 sm:mb-0 sm:h-6 text-green-300 " />
          <p className="text-xs sm:text-sm xl:text-md">
            {t('post.photo/video')}
          </p>
          <input
            ref={filePickerRef}
            hidden
            type="file"
            onChange={(e) => handleUploadImage(e)}
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-5 mb-2 sm:mb-0 sm:h-6 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-md">
            {t('post.feeling/activity')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
