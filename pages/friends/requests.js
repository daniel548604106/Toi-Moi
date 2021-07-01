import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Friends/Sidebar';
import EmptyRequest from '../../components/Friends/EmptyRequest';
import useTranslation from 'next-translate/useTranslation';

import RequestCard from '../../components/Friends/Requests/RequestCard';
const requests = ({ requestsReceived }) => {
  const { t } = useTranslation('header');
  const [received, setReceived] = useState(requestsReceived);
  useEffect(() => {
    console.log(requestsReceived, 'requestsReceived');
  }, [requestsReceived]);
  return (
    <div className="flex  flex-col  lg:flex-row">
      <div className="">
        <Sidebar />
      </div>
      <div className="lg:ml-[350px] flex-1 p-3 space-y-3">
        {received.length > 0 ? (
          <div className="max-w-[600px] mx-auto">
            {received.map(({ user }) => (
              <RequestCard key={user._id} t={t} user={user} />
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
