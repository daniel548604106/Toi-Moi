import React from 'react';
import CardLayout from './CardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setSummaryModalShow } from '../../redux/slices/profileSlice';
import router from 'next/router';
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/outline';
const Summary = ({ summary }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  return (
    <CardLayout title="Summary">
      <div className="space-y-2">
        {summary?.work_experience?.map((experience) => (
          <p key={experience._id} className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 mr-2" />在{' '}
            <span className="font-semibold text-sm sm:text-md">
              {experience.company_name}
            </span>
            <span>擔任</span>
            <span className="font-semibold text-sm sm:text-md">
              {experience.job_title}
            </span>
          </p>
        ))}
        {summary?.education?.map((experience) => (
          <p
            key={experience._id}
            className="flex flex-wrap items-center space-x-2"
          >
            <AcademicCapIcon className="h-6 mr-2" />在{' '}
            <span className="font-semibold text-sm sm:text-md">
              {experience.school_name}
            </span>
            <span>主修</span>
            <span className="font-semibold text-sm sm:text-md">
              {experience.major}
            </span>
          </p>
        ))}
        {router.query.id === userInfo.username && (
          <button
            onClick={() => dispatch(setSummaryModalShow(true))}
            className="hover:bg-opacity-50 p-2 rounded-md bg-button w-full"
          >
            編輯詳細資料
          </button>
        )}
      </div>
    </CardLayout>
  );
};

export default Summary;
