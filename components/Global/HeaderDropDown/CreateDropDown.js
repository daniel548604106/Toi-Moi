import React from 'react';
import CreateListItem from './CreateListItem';
import { PencilAltIcon, BookOpenIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setPostInputBoxOpen } from '../../../redux/slices/postSlice';
const CreateDropDown = ({ t }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold">{t('create')}</h2>
      </div>
      <div>
        <div onClick={() => dispatch(setPostInputBoxOpen(true))}>
          <CreateListItem
            Icon={PencilAltIcon}
            title={t('post')}
            description={t('sharePost')}
          />
        </div>
        <div onClick={() => router.push('/stories/create')}>
          <CreateListItem
            Icon={BookOpenIcon}
            title={t('story')}
            description={t('shareVideoOrWriteSth')}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateDropDown;
