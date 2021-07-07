import React, { useEffect } from 'react';
import { XIcon, ThumbUpIcon, UserAddIcon } from '@heroicons/react/solid';
import { useSelector, useDispatch } from 'react-redux';
import { setLikesListOpen } from '../../../redux/slices/postSlice';
import { useRouter } from 'next/router';
import Avatar from '../../Global/Avatar';
import LoaderSpinner from '../../Global/LoaderSpinner';
const LikesListModal = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { likesList } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleDirectToProfile = (like) => {
    dispatch(setLikesListOpen(false));
    router.push(`/${like.user.username}`);
  };
  useEffect(() => {
    console.log(likesList);
  }, [likesList]);

  return (
    <div className="rounded-lg relative bg-secondary text-secondary w-full max-w-[600px]   p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ThumbUpIcon className="h-6 text-main cursor-pointer" />
          <span className="ml-[5px] text-sm text-gray-600">
            {likesList.length}
          </span>
        </div>
        <span
          onClick={() => dispatch(setLikesListOpen(false))}
          className="cursor-pointer p-2 bg-gray-100 rounded-full"
        >
          <XIcon className="h-6" />
        </span>
      </div>
      <hr className="my-[10px]" />
      <div className="h-full max-h-[50vh] overflow-y-auto">
        {likesList.length > 0 ? (
          likesList.map((like) => (
            <div
              key={like._id}
              className="flex items-center justify-between p-2"
            >
              <div
                onClick={() => handleDirectToProfile(like)}
                className="flex items-center"
              >
                <span className="relative">
                  <Avatar
                    profileImage={like.user.profileImage}
                    gender={like.user.gender}
                    username={like.user.username}
                    width={50}
                    height={50}
                  />
                  <span className="absolute bottom-[5px] right-0 p-1 rounded-full bg-main">
                    <ThumbUpIcon className="h-2 text-white " />
                  </span>
                </span>
                <span className="ml-[15px] cursor-pointer hover:underline">
                  {like.user.name}
                </span>
              </div>
              {like.user._id !== userInfo._id && (
                <button className="rounded-md p-2 px-3 flex items-center bg-gray-200">
                  <UserAddIcon className="h-6" />
                  <span className="ml-[5px]">Add friend</span>
                </button>
              )}
            </div>
          ))
        ) : (
          <div>
            <LoaderSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default LikesListModal;
