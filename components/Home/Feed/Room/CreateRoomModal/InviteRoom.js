import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SearchIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import { apiGetFriendList } from '../../../../../api';
import genderAvatar from '../../../../../utils/genderAvatar';
import LoaderSpinner from '../../../../Global/LoaderSpinner';
import { toggleCreateRoomOpen } from '../../../../../redux/slices/globalSlice';
const InviteRoom = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [friendList, setFriendList] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const getFriendList = async () => {
    setLoading(true);
    try {
      const { data } = await apiGetFriendList();
      setFriendList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleJoinRoom = () => {
    dispatch(toggleCreateRoomOpen());
  };
  useEffect(() => {
    getFriendList();
  }, []);
  return (
    <div>
      <div className=" max-h-[60vh] space-y-2 overflow-y-auto">
        <div className="flex items-center justify-center flex-col">
          <Image
            className="rounded-full cursor-pointer"
            width={100}
            height={100}
            src={userInfo.profileImage || genderAvatar(userInfo.gender)}
          />
          <h2 className="mt-2 text-lg sm:text-xl font-semibold">
            Daniel's room
          </h2>
          <div className="text-sm sm:text-md rounded-full bg-button  p-1 px-5 cursor-pointer">
            sdfkjshksdhfkj
          </div>
        </div>
        <div className=" text-sm sm:text-md rounded-full p-1">
          只有獲得邀請的朋友能免申請加入。
        </div>
      </div>
      <hr className="my-2" />
      <div className="space-y-2">
        <h2 className="text-lg sm:text-xl font-semibold">Send Invitations</h2>
        <p className="text-sm sm:text-md">
          獲得邀請的朋友會看到你的包廂，並收到可加入包廂的連結。
        </p>
        <div className="flex items-center p-2 rounded-lg bg-button text-secondary">
          <SearchIcon className="h-6 mr-2" />
          <input
            className="outline-none w-full bg-button"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        friendList &&
        friendList.map(({ user }) => (
          <div
            className="mt-2 flex items-center justify-between"
            key={user._id}
          >
            <div className=" flex items-center p-2">
              <Image
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                src={user.profileImage || genderAvatar(user.gender)}
              />
              <span className="ml-[10px] text-sm sm:text-md">{user.name}</span>
            </div>
            <button className="p-2 rounded-lg bg-main text-white text-sm sm:text-md">
              Send
            </button>
          </div>
        ))
      )}
      <button
        onClick={() => handleJoinRoom()}
        className="mt-2 mb-32 sm:mb-0 w-full p-2 rounded-lg bg-main text-white"
      >
        Join Room
      </button>
    </div>
  );
};

export default InviteRoom;
