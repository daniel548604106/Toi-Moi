import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CameraIcon, GlobeIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import BioInput from './BioInput';
import TabsList from './TabsList';
import ProfileImage from './ProfileImage';
import { apiPatchProfile, apiPostNewPost } from '../../api';
import {
  setViewPostModalOpen,
  apiGetCurrentPost
} from '../../redux/slices/postSlice';

const ProfileCover = ({ user, profile }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isCoverImageEditable, setCoverImageEditable] = useState(false);
  const [coverImage, setCoverImage] = useState(profile.profileCoverImage);
  const [coverDescription, setCoverDescription] = useState(
    profile.profileCoverDescription
  );
  const [bio, setBio] = useState(profile.bio);

  const inputRef = useRef(null);
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleCancelImageUpdate = () => {
    setCoverImageEditable(false);
    setCoverImage(profile.profileCoverImage || '');
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    console.log('triggered');
    setCoverImageEditable(true);
    reader.onload = (readerEvent) => {
      console.log('reader', readerEvent);
      setCoverImage(readerEvent.target.result);
    };
  };

  const handleSaveImageChanges = () => {
    setCoverImageEditable(false);
    sendUpdates(bio, coverDescription, coverImage);
  };

  const handleViewCoverPost = async () => {
    await dispatch(apiGetCurrentPost(profile.profileCoverPostId));
    dispatch(setViewPostModalOpen(true));
  };

  const isEditable = userInfo.username === router.query.id;

  const sendUpdates = async (
    bio,
    profileCoverDescription,
    profileCoverImage
  ) => {
    try {
      const { data } = await apiPostNewPost({
        image: profileCoverImage,
        text: profileCoverDescription,
        location: '',
        type: 'profileCover'
      });
      console.log('post created', data);
      const res = await apiPatchProfile({
        username: router.query.id,
        bio,
        profileCoverPostId: data,
        profileCoverDescription,
        profileCoverImage
      });

      console.log('profile cover changed', res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCoverDescription(profile.profileCoverDescription);
    setCoverImage(profile.profileCoverImage);
    setBio(profile.bio);
  }, [profile]);

  return (
    <div className=" bg-white ">
      <div className="max-w-7xl mx-auto relative">
        {isCoverImageEditable && (
          <div className="absolute top-0 w-full left-0 z-30 flex items-center justify-between p-3 bg-black bg-opacity-10">
            <div className="flex items-center text-white">
              <GlobeIcon className="h-6" />
              <p className="text-sm ml-[5px]">
                Your Cover Photo Will Be Visible To Everyone
              </p>
            </div>
            <div>
              <button
                onClick={() => handleCancelImageUpdate()}
                className=" text-gray-600 hover:opacity-80 bg-gray-100 bg-opacity-20 rounded-md py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveImageChanges()}
                className="ml-[10px] text-white bg-blue-600  rounded-md py-2 px-4"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
        <div
          onClick={() => handleViewCoverPost()}
          className={`${
            isCoverImageEditable && 'cursor-move'
          } relative cursor-pointer bg-gray-100 w-full  rounded-xl`}
        >
          <Image
            width={1000}
            height={350}
            className="object-cover rounded-b-2xl"
            layout="responsive"
            src={coverImage || `/images/profileCoverDefault.png`}
          />
          {isEditable && (
            <span
              onClick={() => inputRef.current.click()}
              className="px-4 py-2 absolute bottom-5 hover:shadow-xl cursor-pointer rounded-md right-5 bg-white"
            >
              <CameraIcon className="h-6 " />
              <input
                onChange={(e) => addImageToPost(e)}
                ref={inputRef}
                type="file"
                hidden
              />
            </span>
          )}
          <div className="absolute translate-y-[10px] bottom-0 transform left-1/2 -translate-x-1/2">
            <ProfileImage profileImage={user.profileImage} />
          </div>
        </div>

        <div className=" p-5 space-x-2  flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <BioInput
            isEditable={isEditable}
            originalBio={profile.bio}
            bio={bio}
            setBio={setBio}
            sendUpdates={sendUpdates}
          />
          <hr className="my-2" />
        </div>
      </div>
    </div>
  );
};

export default ProfileCover;
