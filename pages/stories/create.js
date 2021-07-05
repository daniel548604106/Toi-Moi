import React, { useRef, useState } from 'react';
import { XIcon, TranslateIcon, PhotographIcon } from '@heroicons/react/outline';
import Image from 'next/dist/client/image';
import Avatar from '../../components/Global/Avatar';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import router from 'next/router';
// import Preview from '../../components/Stories/Preview';
import { backgroundSelections } from '../../utils/storyOptions';
import { apiUploadStoryImage } from '../../api';

const Preview = dynamic(() => import('../../components/Stories/Preview'), {
  ssr: false
});

const Create = () => {
  const stageRef = useRef(null);
  const inputRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [text, setText] = useState('');

  const [storyInfo, setStoryInfo] = useState({
    type: '',
    image: ''
  });
  const [selectedBg, setSelectedBg] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleImageSelected = (file) => {
    const reader = new FileReader();
    if (file) {
      // Asynchronous function , read the file as an URL
      reader.readAsDataURL(file);
    }
    // When it comes back , it comes back as a result
    reader.onload = (readerEvent) => {
      setStoryInfo((storyInfo) => ({
        ...storyInfo,
        type: 'image',
        image: readerEvent.target.result
      }));
    };
  };

  const handleReset = () => {
    setStoryInfo({
      type: '',
      image: ''
    });
  };

  // const handleUploadStory = () => {
  //   const uri = stageRef.current.toDataURL();
  //   console.log(uri);
  // };
  const handleUploadStory = async () => {
    const canvasImage = stageRef.current.toDataURL();
    setLoading(true);
    try {
      const { data } = await apiUploadStoryImage({
        image: canvasImage,
        type: storyInfo.type,
        taggedUsers: []
      });
      setLoading(false);
      router.push('/');
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // we also can save uri as file
    // downloadURI(uri, 'stage.png');
  };

  return (
    <div className="flex h-screen fixed top-0 left-0 w-full">
      <div className="relative p-2 space-y-3 sm:p-3 w-[400px] bg-secondary shadow-lg">
        <div onClick={() => router.push('/')} className="flex items-center">
          <span className="p-2 cursor-pointer rounded-full bg-button mr-[10px]">
            <XIcon className="h-6" />
          </span>
        </div>
        <hr />
        <div>
          <h2 className="text-lg sm:text-2xl font-semibold">你的限時動態</h2>
        </div>
        <div className="flex items-center space-x-3">
          <Avatar
            width={60}
            height={60}
            profileImage={userInfo.profileImage}
            gender={userInfo.gender}
            username={userInfo.username}
          />
          <p className="font-semibold">{userInfo.name}</p>
        </div>
        <hr />
        <div className="flex items-center space-x-3 cursor-pointer">
          <span className="border rounded-full p-2">
            <TranslateIcon className="h-6" />
          </span>
          <p>新增文字</p>
        </div>
        <div>
          <textarea
            placeholder="type"
            onChange={(e) => setText(e.target.value)}
            className="border w-full rounded-lg p-2 min-h-[200px]"
          />
          <button className="mb-3 group text-left  focus:outline-none w-full relative border rounded-lg p-2 cursor-pointer">
            <p className="p-2">{backgroundSelections[selectedIdx].title}</p>
            <div className="hidden z-40 text-left bg-secondary  left-0  rounded-lg group-focus:block absolute bottom-0 transform translate-y-full w-full border p-2">
              {backgroundSelections.map((selection, idx) => (
                <p
                  onClick={() => setSelectedIdx(idx)}
                  className="p-2"
                  key={selection.id}
                >
                  {selection.title}
                </p>
              ))}
            </div>
          </button>
          <div className="border rounded-lg p-2 cursor-pointer">
            <h2>背景</h2>
            <div className="space-x-3 flex items-center">
              {backgroundSelections[selectedIdx].selections.map((selection) => (
                <Image
                  className="rounded-full mr-2"
                  src={selection.src}
                  width={30}
                  height={30}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center absolute bottom-0 left-0 w-full border p-3">
          <button
            onClick={() => handleReset()}
            className="rounded-lg shadow-lg mr-[10px] p-3 px-5 text-sm sm:text-md"
          >
            捨棄
          </button>
          <button
            onClick={() => handleUploadStory()}
            className="flex-1 rounded-lg shadow-lg p-3 text-sm sm:text-md bg-main text-white"
          >
            分享到限時動態
          </button>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        {storyInfo.type ? (
          <Preview
            text={text}
            stageRef={stageRef}
            storyInfo={storyInfo}
            selectedIdx={selectedIdx}
          />
        ) : (
          <div className="flex items-center">
            <div
              onClick={() => inputRef.current.click()}
              className="flex items-center justify-center flex-col space-y-3 cursor-pointer   mr-[10px] w-[220px] h-[330px] bg-gradient-to-br from-main to-main-yellow text-white rounded-lg border"
            >
              <div className="border rounded-full p-2">
                <PhotographIcon className="h-6" />
              </div>{' '}
              <p>新增圖片限時動態</p>
            </div>
            <div
              onClick={() =>
                setStoryInfo((storyInfo) => ({ ...storyInfo, type: 'text' }))
              }
              className="flex items-center flex-col space-y-3 justify-center cursor-pointer w-[220px] h-[330px]  bg-gradient-to-br from-blue-500 to-pink-600 rounded-lg text-white   border  "
            >
              <div className="border rounded-full p-2">
                <TranslateIcon className="h-6" />
              </div>
              <p>新增文字</p>
            </div>
          </div>
        )}

        <input
          accept="image/png, image/gif, image/jpeg"
          ref={inputRef}
          type="file"
          onChange={(e) => handleImageSelected(e.target.files[0])}
          hidden
        />
      </div>
    </div>
  );
};

export default Create;
