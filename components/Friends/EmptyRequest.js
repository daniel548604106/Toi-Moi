import React from 'react';
import Image from 'next/image';
const EmptyRequest = () => {
  return (
    <div className="flex h-full items-center justify-center flex-col">
      <Image width={100} height={100} src="/images/empty-request.svg" />
      <p className="text-lg sm:text-xl font-semibold mt-3">No Requests Found</p>
    </div>
  );
};

export default EmptyRequest;
