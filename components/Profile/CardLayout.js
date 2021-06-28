import React from 'react';
import { useRouter } from 'next/router';
const CardLayout = ({ title, buttonName, buttonLink, children }) => {
  const router = useRouter();
  const username = router.query.id;
  return (
    <div className="sticky rounded-xl mb-[15px] bg-secondary text-secondary shadow-xl border p-4 ">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-lg sm:text-xl">{title}</h2>
        {buttonName && (
          <span
            className="text-main text-sm p-2 rounded-md cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/${username}/${buttonLink}`)}
          >
            {buttonName}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default CardLayout;
