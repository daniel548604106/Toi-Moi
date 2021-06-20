import React from 'react';
import CardLayout from './CardLayout';
import { useDispatch } from 'react-redux';
import { setSummaryModalShow } from '../../redux/slices/profileSlice';
const Summary = () => {
  const dispatch = useDispatch();
  return (
    <CardLayout title="Summary">
      <button
        onClick={() => dispatch(setSummaryModalShow(true))}
        className="hover:bg-gray-200 p-2 rounded-md bg-gray-100 w-full"
      >
        編輯詳細資料
      </button>
    </CardLayout>
  );
};

export default Summary;
