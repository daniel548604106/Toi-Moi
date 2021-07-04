import React, { useState, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCreateRoomOpen } from '../../../../../redux/slices/globalSlice';
import { apiGetFriendList } from '../../../../../api';
import LoaderSpinner from '../../../../Global/LoaderSpinner';
import router from 'next/router';
import Avatar from '../../../../Global/Avatar';
const InviteRoom = ({ roomCode }) => {
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
    router.push(`/groupcall/${roomCode}`);
  };
  useEffect(() => {
    getFriendList();
  }, []);
  return (
    <div>
      <div className=" max-h-[60vh] space-y-2 overflow-y-auto">
        <div className="flex items-center justify-center flex-col">
          <Avatar
            width="100"
            height="100"
            username={userInfo.username}
            profileImage={userInfo.profileImage}
            gender={userInfo.gender}
          />
          <h2 className="mt-2 text-lg sm:text-xl font-semibold">
            Daniel's room
          </h2>
          <div className="text-xs truncate sm:text-md rounded-full bg-button  p-1 px-5 cursor-pointer">
            {roomCode}
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
        friendList && (
          <div className="max-h-[40vh] h-auto overflow-y-auto">
            {friendList.map(({ user }) => (
              <div
                className="mt-2 flex items-center justify-between"
                key={user._id}
              >
                <div className=" flex items-center p-2">
                  <Avatar
                    width="40"
                    height="40"
                    username={userInfo.username}
                    profileImage={userInfo.profileImage}
                    gender={userInfo.gender}
                  />
                  <span className="ml-[10px] text-sm sm:text-md">
                    {user.name}
                  </span>
                </div>
                <button className="p-2 rounded-lg bg-main text-white text-sm sm:text-md">
                  Send
                </button>
              </div>
            ))}
          </div>
        )
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
