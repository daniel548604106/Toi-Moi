import React from 'react';
import genderAvatar from '../../../utils/genderAvatar';
import BirhdayCardLayout from './BirhdayCardLayout';
import Image from 'next/image';
import dayjs from 'dayjs';
const RecentBirthdays = ({ recentBirthdays }) => {
  return (
    <BirhdayCardLayout title="Recent Birthdays">
      {recentBirthdays.map((recentBirthday) => (
        <div
          className="flex p-5 items-center py-5 border-b"
          key={recentBirthday._id}
        >
          <Image
            width={60}
            height={60}
            className="rounded-full"
            src={
              recentBirthday.profileImage || genderAvatar(recentBirthday.gender)
            }
          />
          <div className="flex-1 ml-[20px]">
            <p className="text-md sm:text-lg font-semibold">
              {recentBirthday.name}
            </p>
            <p className="text-xs sm:text-sm text-secondary">
              <span>{+dayjs(recentBirthday.birthday).get('month') + 1}</span>
              <span>/</span>
              <span>{dayjs(recentBirthday.birthday).get('date')}</span>
            </p>
            <input
              className="text-sm sm:text-md shadow-md bg-button text-primary w-full p-2 px-5 rounded-full outline-none"
              type="text"
              placeholder={`Post on ${
                recentBirthday.gender === 'female' ? 'her' : 'his'
              } profile`}
            />
          </div>
        </div>
      ))}
    </BirhdayCardLayout>
  );
};

export default RecentBirthdays;
