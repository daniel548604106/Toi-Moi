import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCover from '../../components/Profile/ProfileCover';
import Summary from '../../components/Profile/Summary';
import Friends from '../../components/Profile/Friends';
import Photos from '../../components/Profile/Photos';
import Post from '../../components/Home/Feed/Post';
import { apiGetProfile, apiGetProfilePosts } from '../../api/index';
import { useRouter } from 'next/router';
import InputBox from '../../components/Home/Feed/InputBox';
const Index = ({ profileData, postsData }) => {
  const router = useRouter();
  useEffect(() => {
    console.log('posts', postsData);
  }, []);
  const [profile, setProfile] = useState(profileData.profile);
  const [user, setUser] = useState(profileData.profile.user);
  const [posts, setPosts] = useState(postsData);
  useEffect(() => {
    console.log('hi');
    const getProfile = async (username) => {
      try {
        const { data } = await apiGetProfile(username);
        console.log('new', data);
        setProfile(data.profile);
        setUser(data.profile.user);
      } catch (error) {
        console.log(error);
      }
    };
    const getProfilePosts = async (username) => {
      try {
        const { data } = await apiGetProfilePosts(username);
        setPosts(data);
        console.log('newPosts', data);
      } catch (error) {
        console.log(error);
      }
    };

    Promise.all([
      getProfile(router.query.id),
      getProfilePosts(router.query.id)
    ]);
  }, [router.query.id]);

  return (
    <div>
      <div className="bg-gradient-to-b from-gray-400 via-white to-white">
        <ProfileCover profile={profile} user={user} />
      </div>
      <main className="max-w-7xl mx-auto p-4 bg-[#fafafa] flex-col md:flex-row  flex justify-center">
        <div className="w-full mr-[10px] md:sticky top-[100px] self-start">
          <Summary />
          <Photos />
          <Friends />
        </div>
        <div className="w-full">
          <div className="mb-[30px]">
            <InputBox />
          </div>
          {posts.map((post) => (
            <div key={post._id} className="mb-[15px]">
              <Post post={post} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;

export async function getServerSideProps({ req, params, res }) {
  try {
    const username = params.id;
    const token = req.cookies.token;
    const profile = await axios.get(
      `${process.env.BASE_URL}/api/profile/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const posts = await axios.get(
      `${process.env.BASE_URL}/api/profile/posts/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return {
      props: {
        profileData: profile.data,
        postsData: posts.data
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
