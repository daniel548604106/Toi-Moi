import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XIcon } from '@heroicons/react/outline';
import {
  setEditProfileImageOpen,
  getMyInfo
} from '../../redux/slices/userSlice';
import Loader from '../Global/Loader';
import Image from 'next/dist/client/image';
import { getProfileData } from '../../redux/slices/profileSlice.js';
import { useRouter } from 'next/router';
import { apiPatchProfileImage, apiPostNewPost } from '../../api/index';
const EditProfileImageModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const profileImageToUpdate = useSelector(
    (state) => state.user.profileImageToUpdate
  );
  const userInfo = useSelector((state) => state.user.userInfo);

  const sendUpdates = async (profileImageToUpdate) => {
    try {
      const { data } = await apiPostNewPost({
        image: profileImageToUpdate,
        text,
        location: '',
        type: 'profileImage'
      });
      const res = await apiPatchProfileImage({
        username: router.query.id,
        profileImageDescription: text,
        profileImagePostId: data,
        profileImage: profileImageToUpdate
      });

      console.log('profile cover changed', res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitUpdate = async () => {
    try {
      setLoading(true);
      await sendUpdates(profileImageToUpdate);
      // Get updated user info
      await dispatch(getMyInfo());
      // Get updated user profile
      await dispatch(getProfileData(userInfo.username));
      setLoading(false);
      dispatch(setEditProfileImageOpen(false));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="rounded-lg relative max-w-[600px] w-full bg-secondary text-secondary shadow-xl">
      <span
        onClick={() => dispatch(setEditProfileImageOpen(false))}
        className="absolute cursor-pointer top-[8px] right-[8px] rounded-full bg-gray-100 p-2"
      >
        <XIcon className="h-6" />
      </span>
      <div className="py-3 border-b flex text-lg font-semibold items-center justify-center">
        Update Profile Image
      </div>
      <div className="p-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:border-main w-full"
          placeholder="Description"
        ></textarea>
        <div className="p-3 relative   mx-auto w-[300px] min-h-[300px] sm:h-[500px] sm:w-[500px] ">
          {profileImageToUpdate && (
            <Image
              layout="fill"
              className=" object-cover rounded-md"
              src={profileImageToUpdate}
            />
          )}
        </div>
      </div>
      <div className="p-3 border-t flex items-center justify-end">
        <button
          onClick={() => dispatch(setEditProfileImageOpen(false))}
          className="rounded-md p-2 text-sm px-4 hover:shadow-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSubmitUpdate()}
          className="rounded-md flex items-center justify-center p-2 text-sm px-4 bg-main text-white ml-[10px]"
        >
          {isLoading ? <Loader /> : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default EditProfileImageModal;
