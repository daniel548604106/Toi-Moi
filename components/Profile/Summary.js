import React from 'react';
import CardLayout from './CardLayout';

const Summary = () => {
  return (
    <CardLayout title="Summary">
      <button className="hover:bg-gray-200 p-2 rounded-md bg-gray-100 w-full">
        編輯詳細資料
      </button>
    </CardLayout>
  );
};

export default Summary;
