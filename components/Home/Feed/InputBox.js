import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { VideoCameraIcon, CameraIcon } from '@heroicons/react/solid';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { apiPostNewPost } from '../../../api/index';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const InputBox = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();
  const filePickerRef = useRef(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const sendPost = async (e) => {
    try {
      e.preventDefault();
      if (text === '') return;
      const { data } = await apiPostNewPost({ image, text, location });
      setText('');
      setImage(null);
      console.log('hi', inputRef.current.value, data);
    } catch (error) {
      console.log(error);
    }
  };

  const addImageToPost = (e) => {
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
  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="p-3 shadow-md font-medium rounded-xl bg-white">
      <div className="flex items-center space-x-2 mb-3">
        <Image
          onClick={() => router.push(`/${userInfo.username}`)}
          className="rounded-full cursor-pointer"
          src={userInfo.profileImage}
          height={40}
          width={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            onChange={(e) => setText(e.target.value)}
            ref={inputRef}
            className="rounded-xl px-5 h-12 bg-gray-100 flex-grow focus:outline-none"
            type="text"
            value={text}
            placeholder="What's on your mind"
          />
          <button hidden type="submit" onClick={(e) => sendPost(e)}>
            Submit
          </button>
        </form>
      </div>
      {image && (
        <div className="relative h-56 md:h-96">
          <Image layout="fill" objectFit="cover" src={image} alt="image" />
        </div>
      )}
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-6 text-red-500" />
          <p className="text-sm sm:text-sm xl:text-base whitespace-nowrap">
            Live Stream
          </p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-6 text-green-300" />
          <p className="text-sm sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            hidden
            type="file"
            onChange={(e) => addImageToPost(e)}
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-6 text-yellow-300" />
          <p className="text-sm sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
