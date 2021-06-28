import React, { useState, useEffect } from 'react';
import FriendCard from '../../components/Friends/FriendCard';
import Sidebar from '../../components/Friends/Sidebar';
import axios from 'axios';
const Index = ({ recommendations }) => {
  const [currentRecommendations, setCurrentRecommendations] =
    useState(recommendations);
  useEffect(() => {
    console.log(recommendations, 'recommendations');
  }, [recommendations]);
  return (
    <div className="flex">
      <div className="hidden md:block min-w-[300px] w-[20%]">
        <Sidebar />
      </div>
      <div className="flex-1 p-3 space-y-3">
        <h2 className="text-lg font-semibold sm:text-2xl">
          Friend Recommendation
        </h2>
        <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {currentRecommendations.map((recommendation) => (
            <FriendCard key={recommendation.username} user={recommendation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(
      `${process.env.BASE_URL}/api/friends/recommendations`
    );
    return {
      props: {
        recommendations: res.data
      }
    };
  } catch (error) {
    console.log(error);
  }
}
