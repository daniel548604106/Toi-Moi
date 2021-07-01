import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import io from 'socket.io-client';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { apiGetChatUserInfo, apiGetAllPosts } from '../api';

import Sidebar from '../components/Home/Sidebar/Sidebar';
// import Post from '../components/Home/Feed/Post';
import Contacts from '../components/Home/Contacts/Index';
import InfiniteScroll from 'react-infinite-scroll-component';
import InputBox from '../components/Home/Feed/InputBox';
// import Room from '../components/Home/Feed/Room/Index';
import genderAvatar from '../utils/genderAvatar';
import LoaderSpinner from '../components/Global/LoaderSpinner';
import PostSkeletonLoader from '../components/Global/Loader/PostSkeletonLoader';
// Dynamic Import
const EndMessage = dynamic(() => import('../components/Home/Feed/EndMessage'), {
  loading: () => <LoaderSpinner />
});
const Post = dynamic(() => import('../components/Home/Feed/Post'), {
  loading: () => <PostSkeletonLoader />
});
const Room = dynamic(() => import('../components/Home/Feed/Room/Index'), {
  loading: () => <LoaderSpinner />
});

const NoPost = dynamic(() => import('../components/Home/Feed/NoPost'), {
  loading: () => <LoaderSpinner />
});
export default function Home({ posts, friends }) {
  const [hasMore, setHasMore] = useState(true);
  const [currentPosts, setCurrentPosts] = useState(posts || []);
  const [currentPage, setCurrentPage] = useState(2);
  const [newMessageReceived, setNewMessageReceived] = useState(null);
  const [newMessagePopup, setNewMessagePopup] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [roomList, setRoomList] = useState(friends);

  const getMorePosts = async () => {
    try {
      const posts = await apiGetAllPosts(currentPage);
      setCurrentPosts((prev) => [...prev, ...posts.data]);
      if (posts.data.length === 0) setHasMore(false);
      setCurrentPage((currentPage) => currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const socket = useRef();

  useEffect(() => {
    setCurrentPosts(posts);
    // Stop loading for more if there's no data at first
    if (posts && posts.length < 1) {
      setHasMore(false);
    }
  }, [posts]);

  useEffect(() => {
    setRoomList(friends);
  }, [friends]);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(process.env.BASE_URL);
    }

    if (socket.current) {
      // keep track of user is online
      socket.current.emit('join', { userId: userInfo._id });
      socket.current.on('newMsgReceived', async ({ newMessage }) => {
        const { name, profileImage, gender } = await apiGetChatUserInfo(
          newMessage.sender
        );
        if (user.newMessagePopup) {
          setNewMessageReceived({
            ...newMessage,
            senderName: name,
            senderProfileImage: profileImage || genderAvatar(gender)
          });
          setMessagePopup(true);
        }
      });
    }
  }, []);

  return (
    <div className="bg-primary text-primary">
      <Head>
        <title>Toi & Moi</title>
        <meta
          name="description"
          content="Toi&Moi is a fullstack social platform designated to connect people from distances away, users are able to build their own profile and connect with people from around the world with realtime messaging and friend system. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" w-full relative flex justify-between p-3">
        <div className="w-1/2 hidden lg:block">
          <Sidebar />
        </div>
        <div className="space-y-5 max-w-[750px] w-full sm:px-5 sm:mx-0  xl:mx-20">
          <InputBox />
          <Room roomList={roomList} />
          {currentPosts && (
            <InfiniteScroll
              dataLength={currentPosts.length} //This is important field to render the next data, only when the length is changed then will trigger next function
              next={getMorePosts}
              hasMore={hasMore}
              loader={<LoaderSpinner />}
              endMessage={<EndMessage />}
              className="scrollbar-hide"
            >
              {currentPosts.map((post) => (
                <div key={post._id} className="mb-[15px] ">
                  <Post post={post} />
                </div>
              ))}
            </InfiniteScroll>
          )}
          {currentPosts && currentPosts.length < 10 && (
            <div className="mt-5">
              <NoPost />
            </div>
          )}
        </div>
        <div className=" w-1/2 hidden md:block ">
          <Contacts friends={friends} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    // get server side cookies
    const token = req.cookies.token;
    let posts, chats, friends;
    if (token) {
      friends = await axios.get(`${process.env.BASE_URL}/api/friends`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      posts = await axios.get(`${process.env.BASE_URL}/api/posts?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    if (!posts.data) {
      return {
        notFound: true
      };
    }
    return {
      props: {
        posts: posts.data,
        friends: friends.data
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        ok: false,
        reason:
          'some error description for your own consumption, not for client side'
      }
    };
  }
}
