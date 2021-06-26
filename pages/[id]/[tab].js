import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProfileCover from '../../components/Profile/ProfileCover';
import TabsList from '../../components/Profile/TabsList';
const Index = ({ data }) => {
  const router = useRouter();
  useEffect(() => {
    console.log(data, router, router.query.tab);
  }, []);
  const [profile, setProfile] = useState(data.profile);
  const [user, setUser] = useState(data.profile.user);
  return (
    <div>
      <ProfileCover profile={profile} user={user} />
      <div className="bg-secondary text-secondary sticky top-[60px] border-b">
        <div className="max-w-7xl mx-auto ">
          <TabsList />
        </div>
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps({ req, params, res }) {
  try {
    const username = params.id;
    const token = req.cookies.token;
    const res = await axios.get(
      `${process.env.BASE_URL}/api/profile/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return {
      props: {
        data: res.data
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: 'Error'
      }
    };
  }
}
