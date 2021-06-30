import React from 'react';
import Image from 'next/image';
import genderAvatar from '../../../utils/genderAvatar';
import router from 'next/router';
import ToolTips from '../../Global/ToolTips';
import dayjs from 'dayjs';
const MonthlyBirthdays = ({ birthdays, month }) => {
  return (
    <div className="bg-secondary text-secondary p-5 rounded-lg">
      <h2 className="text-md sm:text-lg font-semibold mb-2 sm:mb-3">
        {month}月
      </h2>
      <p className="text-sm sm:text-md font-semibold my-3">
        {birthdays[0].name} {birthdays.length > 2 ? '& others' : ''}
      </p>
      <div className="flex items-center ">
        {birthdays.map((user) => (
          <span key={user.username} className="group mr-2  relative">
            <Image
              onClick={() => router.push(`/${user.username}`)}
              className="rounded-full cursor-pointer"
              width={50}
              height={50}
              src={user.profileImage || genderAvatar(user.gender)}
            />
            <div className="group-hover:block hidden text-xs absolute left-1/2 transform translate-y-full -translate-x-1/2 bg-main text-white p-2 rounded-lg bottom-0 whitespace-nowrap">{`${
              user.name
            }的生日是 ${dayjs(user.birthday).format('MM/DD')}`}</div>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MonthlyBirthdays;
