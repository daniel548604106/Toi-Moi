import React from 'react';
import CreateListItem from './CreateListItem';
import { PencilAltIcon, BookOpenIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setPostInputBoxOpen } from '../../redux/slices/postSlice';
const CreateDropDown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold">Create</h2>
      </div>
      <div>
        <div onClick={() => dispatch(setPostInputBoxOpen(true))}>
          <CreateListItem
            Icon={PencilAltIcon}
            title="貼文"
            description="在動態消息分享貼文"
          />
        </div>
        <div onClick={() => router.push('/stories/create')}>
          <CreateListItem
            Icon={BookOpenIcon}
            title="限時動態"
            description="分享影片或是寫點內容"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateDropDown;
