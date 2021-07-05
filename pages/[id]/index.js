import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import ProfileCover from '../../components/Profile/ProfileCover';
import TabsList from '../../components/Profile/TabsList';
import LoaderSpinner from '../../components/Global/LoaderSpinner';
import router from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  setProfileData,
  setSummaryData
} from '../../redux/slices/profileSlice';
import {
  apiGetProfilePosts,
  apiGetProfileFriends,
  apiGetProfileSummary
} from '../../api/index';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
// Dynamic Imports
const Friends = dynamic(() => import('../../components/Profile/Friends'), {
  loading: () => <LoaderSpinner />
});
const Summary = dynamic(() => import('../../components/Profile/Summary'), {
  loading: () => <LoaderSpinner />
});
const Post = dynamic(() => import('../../components/Home/Feed/Post'), {
  loading: () => <LoaderSpinner />
});
const Photos = dynamic(() => import('../../components/Profile/Photos'), {
  loading: () => <LoaderSpinner />
});
const InputBox = dynamic(() => import('../../components/Home/Feed/InputBox'), {
  loading: () => <LoaderSpinner />
});
const EndMessage = dynamic(
  () => import('../../components/Home/Feed/EndMessage'),
  {
    loading: () => <LoaderSpinner />
  }
);

const Index = ({ profileData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const summaryData = useSelector((state) => state.profile.summaryData);

  const [friends, setFriends] = useState(null);
  const [profile, setProfile] = useState(profileData.profile);
  const [user, setUser] = useState(profileData.profile.user);
  const [summary, setSummary] = useState(summaryData);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {
    if (profileData) {
      dispatch(setProfileData(profileData));
    }
  }, [profileData]);
  const getMorePosts = async () => {
    try {
      const { data } = await apiGetProfilePosts(
        profile.user.username,
        currentPage
      );
      console.log(data, 'posts');
      setPosts((prev) => [...prev, ...data]);
      if (data.length === 0) setHasMore(false);
      setCurrentPage((currentPage) => currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const getProfileFriends = async () => {
    try {
      const { data } = await apiGetProfileFriends(router.query.id);
      setFriends(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProfileSummary = async () => {
    try {
      const { data } = await apiGetProfileSummary(router.query.id);
      dispatch(setSummaryData(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfileSummary();
    getProfileFriends();
    getMorePosts();
  }, []);
  useEffect(() => {
    setSummary(summaryData);
  }, [summaryData]);

  return (
    <div className=" bg-primary text-primary">
      <div className="bg-gradient-to-b from-gray-400 via-white to-white">
        <ProfileCover profile={profile} user={user} />
      </div>
      {friends && (
        <div className="bg-secondary text-secondary sm:sticky sm:top-[60px] border-b z-30">
          <div className=" max-w-7xl mx-auto bg-secondary text-secondary self-start ">
            <TabsList
              friend_status={friends.friend_status}
              friends_total={friends.friends_total}
              user={user}
            />
          </div>
        </div>
      )}
      <main className="max-w-7xl mx-auto p-4  flex-col lg:flex-row  flex justify-center">
        <div className="w-full md:mr-[10px] sticky z-20 bottom-0  self-end">
          <Summary summary={summary} />
          <Photos />
          {friends && <Friends friends={friends} />}
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
            className="scrollbar-hide"
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
