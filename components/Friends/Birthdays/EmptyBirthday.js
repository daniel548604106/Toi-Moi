import React from 'react';
import Image from 'next/dist/client/image';
const EmptyBirthday = () => {
  return (
    <div className="flex items-center flex-col justify-center">
      <Image src="/images/empty-birthday.svg" width={100} height={100} />
      <div className="text-lg sm:text-2xl font-semibold mt-3">
        No Birthday Found From Friends
      </div>
    </div>
  );
};

export default EmptyBirthday;
