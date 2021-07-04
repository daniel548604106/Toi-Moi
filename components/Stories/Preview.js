import React from 'react';
import Image from 'next/image';
import { backgroundSelections } from '../../utils/storyOptions';
const Preview = ({ storyInfo, setSelectedIdx }) => {
  return (
    <div className="mx-3 rounded-lg w-full  p-3 bg-secondary border">
      <h2 className="mb-3">預覽</h2>
      <div className="rounded-lg bg-black w-full p-3 flex items-center justify-center">
        <div className=" rounded-lg bg-white">
          {storyInfo.type && storyInfo.type === 'image' ? (
            <Image
              src={storyInfo.image}
              width="440"
              height="660"
              className="object-cover rounded-lg "
            />
          ) : (
            <Image
              width="440"
              height="660"
              src={backgroundSelections[0].selections[2].src}
              className="rounded-lg h-[600px] w-[440px]"
            ></Image>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
