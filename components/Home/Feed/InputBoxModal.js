import React, { useState, useRef, useEffect } from 'react';
import { XIcon, PhotographIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import {
  setImageToPost,
  setPostInputBoxOpen
} from '../../../redux/slices/postSlice';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { apiPostNewPost } from '../../../api/index';
const InputBoxModal = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const imageToPost = useSelector((state) => state.post.imageToPost);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [image, setImage] = useState(imageToPost || '');
  const [location, setLocation] = useState('');

  const fileUploadRef = useRef(null);
  const handleUploadImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      // Asynchronous function , read the file as an URL
      reader.readAsDataURL(e.target.files[0]);
    }
    // When it comes back , it comes back as a result
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  const handleRemoveImage = () => {
    dispatch(setImageToPost(''));
  };

  const sendPost = async (e) => {
    try {
      e.preventDefault();
      if (text === '') return;
      dispatch(setPostInputBoxOpen(false));
      const { data } = await apiPostNewPost({ image, text, location });
      setText('');
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setImage(imageToPost);
  }, [imageToPost]);

  return (
    <div className="h-screen sm:h-auto rounded-md bg-secondary text-secondary w-full max-w-[600px]  relative">
      <XIcon
        onClick={() => dispatch(setPostInputBoxOpen(false))}
        className="h-8 cursor-pointer rounded-full p-1  absolute top-[8px] right-[10px]"
      />
      <div className="p-3 text-center text-lg font-semibold border-b">
        Create Post
      </div>
      <div className="p-3">
        <div className="flex items-center py-2">
          <Image
            className="rounded-full cursor-pointer"
            src={userInfo.profileImage}
            width={50}
            height={50}
          />
          <span className="ml-[10px]">{userInfo.name}</span>
        </div>
        <div>
          <textarea
            value={text}
            type="text"
            onChange={(e) => setText(e.target.value)}
            className={`min-h-[200px] bg-secondary rounded-md p-2 text-md sm:text-xl ${
              image && 'text-sm min-h-[150px]'
            } w-full focus:outline-none`}
            placeholder={`${userInfo.name}, what's on your mind?`}
          />
          {image && (
            <div className="relative h-56 md:h-96 border rounded-md mb-[10px]">
              <Image layout="fill" objectFit="cover" src={image} alt="image" />
              <XIcon
                onClick={() => handleRemoveImage()}
                className="h-6 cursor-pointer rounded-full border bg-secondary text-secondary absolute top-[10px] right-[10px]"
              />
            </div>
          )}
          <div className="rounded-lg cursor-pointer border p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-md">Add to post</span>
              <div className="flex items-center space-x-1">
                <PhotographIcon
                  onClick={() => fileUploadRef.current.click()}
                  className="text-green-500 cursor-pointer h-6"
                />
                <EmojiHappyIcon className="text-yellow-400 cursor-pointer h-6" />
              </div>
              <input
                onChange={(e) => handleUploadImage(e)}
                ref={fileUploadRef}
                type="file"
                hidden
              />
            </div>
          </div>
        </div>
        <button
          onClick={(e) => sendPost(e)}
          className={`mt-[10px]  text-sm  cursor-default rounded-lg w-full py-3 bg-gray-100 ${
            text && 'bg-main text-white  cursor-pointer'
          } `}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default InputBoxModal;
