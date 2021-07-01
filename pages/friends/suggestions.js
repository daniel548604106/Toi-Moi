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
  const removeRecommendation = (id) => {
    let update = currentRecommendations.filter(
      (recommendation) => recommendation._id !== id
    );
    setCurrentRecommendations(update);
  };
  return (
    <div className="flex flex-col  lg:flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="lg:ml-[350px] flex-1 p-3 space-y-3">
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
    return {
      props: {
        recommendations: res.data
      }
    };
  } catch (error) {
    console.log(error);
  }
}
