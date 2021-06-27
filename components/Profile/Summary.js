import React from 'react';
import CardLayout from './CardLayout';
import { useDispatch,useSelector } from 'react-redux';
import { setSummaryModalShow } from '../../redux/slices/profileSlice';
import router from 'next/router'
const Summary = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state =>state.user)

  return (
    <CardLayout title="Summary">
      {router.query.id === userInfo.username && 
      <button
        onClick={() => dispatch(setSummaryModalShow(true))}
        className="hover:bg-opacity-50 p-2 rounded-md bg-button w-full"
      >
        編輯詳細資料
      </button>

      }
    </CardLayout>
  );
};

export default Summary;
