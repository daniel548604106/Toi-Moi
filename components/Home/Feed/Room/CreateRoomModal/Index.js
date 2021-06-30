import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import CreateRoom from './CreateRoom';
import InviteRoom from './InviteRoom';
import { useDispatch } from 'react-redux';
import { toggleCreateRoomOpen } from '../../../../../redux/slices/globalSlice';
const CreateRoomModal = () => {
  const dispatch = useDispatch();
  const [roomCreated, setRoomCreated] = useState(false);
  return (
    <div className="h-screen sm:max-h-[60vh] sm:h-auto overflow-y-auto relative w-full sm:max-w-[600px] rounded-lg p-3 sm:p-5 bg-secondary text-secondary">
      <span
        onClick={() => dispatch(toggleCreateRoomOpen())}
        className="z-50 absolute cursor-pointer top-4 right-2 rounded-full p-2 bg-button text-secondary"
      >
        <XIcon className="h-6" />
      </span>
      {roomCreated ? (
        <InviteRoom />
      ) : (
        <CreateRoom setRoomCreated={setRoomCreated} />
      )}
    </div>
  );
};

export default CreateRoomModal;
