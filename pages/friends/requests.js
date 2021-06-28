import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Friends/Sidebar';
import EmptyRequest from '../../components/Friends/EmptyRequest';
import genderAvatar from '../../utils/genderAvatar';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';
const requests = ({ requestsReceived }) => {
  const { t } = useTranslation('header');
  const [received, setReceived] = useState(requestsReceived);
  useEffect(() => {
    console.log(requestsReceived, 'requestsReceived');
  }, [requestsReceived]);
  return (
    <div className="flex  flex-col sm:flex-row">
      <div className="min-w-[300px] w-[20%]">
        <Sidebar />
      </div>
      <div className="flex-1 p-3 space-y-3">
        {received.length > 0 ? (
          <div>
            {received.map(({ user }) => (
              <div
                className="w-full max-w-[600px] mx-auto md:flex items-center justify-between p-2 sm:p-3 mb-3 bg-secondary rounded-lg shadow-lg  "
                key={user.username}
              >
                <div
                  onClick={() => router.push(`/${user.username}`)}
                  className="p-2 sm:p-3 flex items-center"
                >
                  <Image
                    className="rounded-full cursor-pointer"
                    width={50}
                    height={50}
                    layout="fixed"
                    src={user.profileImage || genderAvatar(user.gender)}
                  />
                  <div className=" truncate whitespace-nowrap flex-1 ml-[10px] flex items-center justify-between">
                    <p className="hover:underline cursor-pointer truncate">
                      {user.name}
                    </p>
                  </div>
                </div>
                <div className="flex sm:justify-end items-center w-full">
                  <button className="text-sm sm:text-md w-full  sm:w-auto rounded-md p-1 sm:px-3 bg-main text-white">
                    {t('confirm')}
                  </button>
                  <button className="text-sm sm:text-md w-full  sm:w-auto rounded-md p-1 sm:px-3 bg-button text-secondary ml-[10px]">
                    {t('cancel')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-20 sm:mt-32">
            <EmptyRequest />
          </div>
        )}
      </div>
    </div>
  );
};

export default requests;

export async function getServerSideProps({ req }) {
  try {
    const token = req.cookies.token;
    const { data } = await axios.get(
      `${process.env.BASE_URL}/api/friends/received`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return {
      props: {
        requestsReceived: data
      }
    };
  } catch (error) {
    console.log(error);
  }
}
