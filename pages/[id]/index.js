import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCover from '../../components/Profile/ProfileCover';
import Summary from '../../components/Profile/Summary';
import Friends from '../../components/Profile/Friends';
import Photos from '../../components/Profile/Photos';
import TabsList from '../../components/Profile/TabsList';
import Post from '../../components/Home/Feed/Post';
import LoaderSpinner from '../../components/Global/LoaderSpinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import EndMessage from '../../components/Home/Feed/EndMessage';
import { apiGetProfile, apiGetProfilePosts } from '../../api/index';
import { useRouter } from 'next/router';
import InputBox from '../../components/Home/Feed/InputBox';
const Index = ({ profileData, postsData, friends }) => {
  const router = useRouter();
  useEffect(() => {
    console.log('posts', profileData, postsData, friends);
  }, []);
  const [profile, setProfile] = useState(profileData.profile);
  const [user, setUser] = useState(profileData.profile.user);
  const [posts, setPosts] = useState(postsData);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);

  const getMorePosts = async () => {
    try {
      const { data } = await apiGetProfilePosts(
        profile.user.username,
        currentPage
      );
      setPosts((prev) => [...prev, ...data]);
      if (data.length === 0) setHasMore(false);
      setCurrentPage((currentPage) => currentPage + 1);
      console.log('hi');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (posts && posts.length < 1) {
      setHasMore(false);
    }
  }, [posts]);
  // useEffect(() => {
  //   const getProfile = async (username) => {
  //     try {
  //       const { data } = await apiGetProfile(username);
  //       console.log('new', data);
  //       setProfile(data.profile);
  //       setUser(data.profile.user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const getProfilePosts = async (username) => {
  //     try {
  //       const { data } = await apiGetProfilePosts(username);
  //       setPosts(data);
  //       console.log('newPosts', data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   // Promise.all([
  //   //   getProfile(router.query.id),
  //   //   getProfilePosts(router.query.id)
  //   // ]);
  // }, [router.query.id]);

  return (
    <div className=" bg-primary text-primary">
      <div className="bg-gradient-to-b from-gray-400 via-white to-white">
        <ProfileCover profile={profile} user={user} />
      </div>
      <div className="bg-secondary text-secondary sm:sticky sm:top-[60px] border-b z-30">
        <div className=" max-w-7xl mx-auto bg-secondary text-secondary self-start ">
          <TabsList
            friend_status={friends.friend_status}
            friends_total={friends.friends_total}
            user={user}
          />
        </div>
      </div>
      <main className="max-w-7xl mx-auto p-4  flex-col lg:flex-row  flex justify-center">
        <div className="w-full md:mr-[10px] sticky bottom-0  self-end">
          <Summary />
          <Photos />
          <Friends friends={friends} />
        </div>
        <div className="w-full lg:w-[150%]">
          <div className="mb-[30px]">
            <InputBox />
          </div>
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data, only when the length is changed then will trigger next function
            next={getMorePosts}
            hasMore={hasMore}
            loader={<LoaderSpinner />}
            endMessage={<EndMessage />}
          >
            {posts.map((post) => (
              <div key={post._id} className="mb-[15px]">
                <Post post={post} />
              </div>
            ))}
          </InfiniteScroll>
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
      `${process.env.BASE_URL}/api/profile/posts/${username}?page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const friends = await axios.get(
      `${process.env.BASE_URL}/api/profile/friends_preview/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return {
      props: {
        profileData: profile.data,
        postsData: posts.data,
        friends: friends.data
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
