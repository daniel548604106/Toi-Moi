import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { XIcon } from '@heroicons/react/outline';
import { setEditProfileImageOpen } from '../../redux/slices/userSlice';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useRouter } from 'next/router';
import { apiPatchProfileImage, apiPostNewPost } from '../../api/index';
const EditProfileImageModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [text, setText] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const profileImageToUpdate = useSelector(
    (state) => state.user.profileImageToUpdate
  );

  const sendUpdates = async (profileImage) => {
    try {
      const { data } = await apiPostNewPost({
        image: profileImage,
        text,
        location: '',
        type: 'profileImage'
      });
      const res = await apiPatchProfileImage({
        username: router.query.id,
        profileImageDescription: text,
        profileImagePostId: data,
        profileImage
      });

      console.log('profile cover changed', res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitUpdate = () => {
    sendUpdates(profileImage);
  };
  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setProfileImage(cropper.getCroppedCanvas().toDataURL());
    // sendUpdates(cropper.getCroppedCanvas().toDataURL());
    // console.log(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <div className="rounded-lg relative max-w-[600px] w-full bg-white shadow-xl">
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
          className="border p-2 rounded-md focus:outline-none focus:border-blue-600 w-full"
          placeholder="Description"
        ></textarea>
        <div className="p-3 relative w-full h-[500px] ">
          {profileImageToUpdate && (
            <Cropper
              src={profileImageToUpdate}
              style={{ height: 400, width: '100%' }}
              // Cropper.js options
              initialAspectRatio={16 / 9}
              guides={false}
              crop={onCrop}
              ref={cropperRef}
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
          className="rounded-md p-2 text-sm px-4 bg-blue-600 text-white ml-[10px]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfileImageModal;