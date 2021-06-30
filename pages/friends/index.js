import React, { useState, useEffect } from 'react';
import FriendCard from '../../components/Friends/FriendCard';
import RequestCard from '../../components/Friends/Requests/RequestCard';

import Sidebar from '../../components/Friends/Sidebar';
import axios from 'axios';
import useTranslation from 'next-translate/useTranslation';
const Index = ({ recommendations, requestsReceived }) => {
  const { t } = useTranslation('header');
  const [currentRecommendations, setCurrentRecommendations] =
    useState(recommendations);
  const [requests, setRequests] = useState(requestsReceived);
  useEffect(() => {
    console.log(recommendations, requests, 'recommendations');
  }, [recommendations]);
  const removeRecommendation = (id) => {
    let update = currentRecommendations.filter(
      (recommendation) => recommendation._id !== id
    );
    setCurrentRecommendations(update);
  };
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="min-w-[300px] w-[20%]">
        <Sidebar />
      </div>
      <div className="flex-1 p-3 space-y-3">
        {requests.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold sm:text-2xl">
              Requests Received
            </h2>
            {requests.map(({ user }) => (
              <RequestCard key={user._id} t={t} user={user} />
            ))}
          </div>
        )}
        <h2 className="text-lg font-semibold sm:text-2xl">
          Friend Recommendation
        </h2>
        <div className="transition-all grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {currentRecommendations.map((recommendation) => (
            <FriendCard
              removeRecommendation={removeRecommendation}
              key={recommendation.username}
              user={recommendation}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps({ req }) {
  try {
    const token = req.cookies.token;
    const res = await axios.get(
      `${process.env.BASE_URL}/api/friends/recommendations`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const received = await axios.get(
      `${process.env.BASE_URL}/api/friends/received`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return {
      props: {
        recommendations: res.data,
        requestsReceived: received.data
      }
    };
  } catch (error) {
    console.log(error);
  }
}
