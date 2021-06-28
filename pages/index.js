import { useState, useEffect, useRef } from 'react';

import io from 'socket.io-client';
import Head from 'next/head';
import Sidebar from '../components/Home/Sidebar';
import { useSelector } from 'react-redux';
import Feed from '../components/Home/Feed/Index';
import { apiGetChatUserInfo, apiGetAllPosts } from '../api';
import Contacts from '../components/Home/Contacts/Index';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import genderAvatar from '../utils/genderAvatar';
export default function Home({ posts, chats }) {
  const [hasMore, setHasMore] = useState(true);
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [currentChats, setCurrentChats] = useState(chats);
  const [currentPage, setCurrentPage] = useState(2);
  const [newMessageReceived, setNewMessageReceived] = useState(null);
  const [newMessagePopup, setNewMessagePopup] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const getMorePosts = async () => {
    try {
      console.log('get');
      const posts = await apiGetAllPosts(currentPage);
      setCurrentPosts((prev) => [...prev, ...posts.data]);
      console.log('new', posts.data);
      if (posts.data.length === 0) setHasMore(false);
      setCurrentPage((currentPage) => currentPage + 1);
      console.log(currentPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const socket = useRef();

  useEffect(() => {
    setCurrentPosts(posts);
  }, [posts]);
  useEffect(() => {
    console.log(chats, 'chats');
  }, [chats]);

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
      <main className="pt-[80px] w-full relative flex justify-between p-3">
        <div className="w-1/2 hidden lg:block">
          <Sidebar />
        </div>
        <div className="w-full">
          {currentPosts && (
            <InfiniteScroll
              dataLength={currentPosts.length} //This is important field to render the next data, only when the length is changed then will trigger next function
              next={getMorePosts}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Feed posts={currentPosts} />
            </InfiniteScroll>
          )}
        </div>
        <div className=" w-1/2 hidden md:block ">
          <Contacts chats={chats} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    // get server side cookies
    const token = req.cookies.token;
    let posts, chats;
    if (token) {
      posts = await axios.get(`${process.env.BASE_URL}/api/posts?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      chats = await axios.get(`${process.env.BASE_URL}/api/chats`, {
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
        chats: chats.data
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
