import React from 'react';
import {
  UserIcon,
  ChevronLeftIcon,
  XIcon,
  PlusIcon
} from '@heroicons/react/outline';
import { stubFalse } from 'lodash';

const roomNames = [
  {
    name: '小聚一下',
    icon: '😅'
  },
  {
    name: '一起來！',
    icon: '😂'
  },
  {
    name: '快來陪我',
    icon: '🤣'
  },
  {
    name: 'TGIF',
    icon: '😊'
  },
  {
    name: '畢業派對',
    icon: '😇'
  },
  {
    name: '在家好無聊',
    icon: '🙂'
  },
  {
    name: '歡樂時光',
    icon: '😉'
  },
  {
    name: '熱舞趴',
    icon: '😉'
  },
  {
    name: '家庭時光',
    icon: '😉'
  },
  {
    name: '午餐會',
    icon: '😉'
  },
  {
    name: '遊戲之夜',
    icon: '😉'
  },
  {
    name: '健身',
    icon: '😉'
  },
  {
    name: '追劇',
    icon: '😉'
  },
  {
    name: '團體聚會',
    icon: '😉'
  },
  {
    name: 'KTV',
    icon: '😉'
  },
  {
    name: '歡樂頌',
    icon: '😉'
  },
  {
    name: '生日',
    icon: '🎂'
  }
];

const CreateRoomName = ({ setRoomInfo, roomInfo, setCreateNameOpen }) => {
  const handleSelectName = (room) => {
    setRoomInfo({ ...roomInfo, name: room.name, icon: room.icon });
    setCreateNameOpen(false);
  };
  return (
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
      <div className="max-h-[40vh] overflow-y-auto flex items-center whitespace-nowrap flex-shrink-0 flex-wrap">
        <div className="flex  items-center min-w-[50%] p-3 cursor-pointer rounded-lg">
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
  );
};

export default CreateRoomName;
