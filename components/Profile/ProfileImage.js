import React, { useRef } from 'react';
import { CameraIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEditProfileImageOpen,
  setProfileImageToUpdate
} from '../../redux/slices/userSlice';
import router from 'next/router';
const ProfileImage = ({ profileImage }) => {
  const dispatch = useDispatch();
  const profileImageRef = useRef(null);
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleNewProfileImagePreview = (e) => {
    e.stopPropagation();
    profileImageRef.current.click();
  };

  const handleViewCurrentProfile = (e) => {
    e.stopPropagation();
  };
  const addProfileImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log('triggered');

    reader.onload = (readerEvent) => {
      console.log('reader', readerEvent);
      dispatch(setProfileImageToUpdate(readerEvent.target.result));
    };
    dispatch(setEditProfileImageOpen(true));
  };
  return (
    <div className="relative  border w-[160px] h-[160px] rounded-full border-white ">
      <Image
        onClick={(e) => handleViewCurrentProfile(e)}
        className="cursor-pointer object-cover h-[60px] w-[60px] sm:w-[100px] sm:h-[100px]   rounded-full"
        src={profileImage}
        layout="fill"
      />
      {router.query.id === userInfo.username && (
        <span
          name="profile"
          onClick={(e) => handleNewProfileImagePreview(e)}
          className="absolute bottom-0 border-2 right-0 p-2 rounded-full bg-white shadow-md hover:shadow-xl"
        >
          <CameraIcon className="h-6 " />
          <input
            onChange={(e) => addProfileImageToPost(e)}
            ref={profileImageRef}
            type="file"
            hidden
          />
        </span>
      )}
    </div>
  );
};

export default ProfileImage;
