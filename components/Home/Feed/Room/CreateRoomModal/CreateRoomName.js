import React, { useState } from 'react';
import {
  UserIcon,
  ChevronLeftIcon,
  XIcon,
  PlusIcon
} from '@heroicons/react/outline';
import { newIcons, roomNames } from '../../../../../utils/roomEmoji';
const CreateRoomName = ({ setRoomInfo, roomInfo, setCreateNameOpen }) => {
  const [newNameOpen, setNewNameOpen] = useState(false);
  const [currentRoomInfo, setCurrentRoomInfo] = useState({
    name: roomInfo.name,
    icon: roomInfo.icon
  });
  const handleSelectName = (room) => {
    setRoomInfo({ ...roomInfo, name: room.name, icon: room.icon });
    setCreateNameOpen(false);
  };
  const handleChangeNewName = (value) => {
    setCurrentRoomInfo({ ...currentRoomInfo, name: value });
  };
  const handleSelectNewIcon = (icon) => {
    setCurrentRoomInfo({ ...currentRoomInfo, icon });
  };
  const handleSaveRoomInfo = () => {
    setRoomInfo({
      ...roomInfo,
      name: currentRoomInfo.name,
      icon: currentRoomInfo.icon
    });
    setCreateNameOpen(false);
  };
  return (
    <div>
      {newNameOpen ? (
        <div>
          <div className="relative flex items-center text-secondary bg-secondary">
            <span
              onClick={() => setNewNameOpen(false)}
              className="cursor-pointer p-2 rounded-full bg-secondary shadow-lg text-secondary"
            >
              <ChevronLeftIcon className="h-6" />
            </span>
            <h2 className="text-lg sm:text-xl font-semibold absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
              New Room Name
            </h2>
          </div>
          <hr className="my-4" />
          <div>
            <div className="border flex items-center rounded-lg w-full p-3">
              <span className="bg-secondary mr-4 rounded-full w-[50px] h-[50px] flex items-center justify-center">
                <span className="text-lg sm:text-2xl">
                  {currentRoomInfo.icon}
                </span>
              </span>
              <div>
                <p className="text-xs text-main">Room Name</p>
                <input
                  className="focus:outline-none "
                  value={currentRoomInfo.name}
                  onChange={(e) => handleChangeNewName(e.target.value)}
                  type="text"
                  placeholder="New Name"
                />
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <h2 className="text-secondary text-lg sm:text-xl font-semibold">
                Choose Emoji
              </h2>
              <div className="grid grid-cols-8">
                {newIcons.map((icon) => (
                  <div
                    onClick={() => handleSelectNewIcon(icon)}
                    className=" cursor-pointer p-3 rounded-full"
                  >
                    <span className="text-lg sm:text-2xl">{icon}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSaveRoomInfo()}
                className="w-full rounded-lg p-2 bg-main text-white hover:opacity-80"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="relative flex items-center text-secondary bg-secondary">
            <span
              onClick={() => setCreateNameOpen(false)}
              className="cursor-pointer p-2 rounded-full bg-secondary shadow-lg text-secondary"
            >
              <ChevronLeftIcon className="h-6" />
            </span>
            <h2 className="text-lg sm:text-xl font-semibold absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
              Room Name
            </h2>
          </div>
          <hr className="my-4" />
          <div className="max-h-[60vh] sm:max-h-[40vh] overflow-y-auto flex items-center whitespace-nowrap flex-shrink-0 flex-wrap">
            <div
              onClick={() => setNewNameOpen(true)}
              className="flex  items-center min-w-[50%] p-3 cursor-pointer rounded-lg"
            >
              <span className="rounded-full p-2 mr-2 shadow-lg">
                <PlusIcon className="h-6" />
              </span>
              <span>New Event</span>
            </div>
            {roomNames.map((room) => (
              <div
                key={room.name}
                onClick={() => handleSelectName(room)}
                className="min-w-[50%] p-3 cursor-pointer transition-all hover:brightness-110 hover:scale-120 rounded-lg"
              >
                <span className="rounded-full p-2 shadow-lg mr-2">
                  <span className="text-lg sm:text-2xl">{room.icon}</span>
                </span>
                <span>{room.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRoomName;
