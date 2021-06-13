import React, { useEffect, useRef, useState } from 'react';
import { apiGetChats } from '../../api/index';
import axios from 'axios';
import ChatroomSidebarHeader from '../../components/Messages/ChatroomSidebar/ChatroomSidebarHeader';
import ChatroomList from '../../components/Messages/ChatroomSidebar/ChatroomList';
import ChatroomSidebarFooter from '../../components/Messages/ChatroomSidebar/ChatroomSidebarFooter';
import ChatroomMainHeader from '../../components/Messages/ChatroomMain/ChatroomMainHeader';
import ChatroomMainRoom from '../../components/Messages/ChatroomMain/ChatroomMainRoom';
import { useRouter } from 'next/router';
import { apiGetChat } from '../../api/index';
const io = require('socket.io-client');
const Index = (props) => {
  const [chats, setChats] = useState(props.chats);
  const [activeChatMessage, setActiveChatMessage] = useState();
  const router = useRouter();
  const socket = useRef();

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(process.env.BASE_URL);
    }

    if (socket.current) {
      socket.current.emit('sendMessage', {
        name: 'hihi'
      });
      socket.current.on('dataReceived', (data) => {
        console.log(data);
      });
    }
  }, []);

  useEffect(() => {
    if (chats.length > 0 && !router.query.message) {
      router.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
        shallow: true
      });
    }
  }, [chats]);

  useEffect(() => {
    const getActiveMessage = () => {
      try {
        const { data } = apiGetChat(router.query.message);
        console.log(data);
      } catch (error) {
        conosle.log(error);
      }
    };
    getActiveMessage();
  }, [router.query.message]);
  return (
    <div className="flex h-100vh  ">
      <div className="w-full p-2 xl:w-[500px] border-r-2  flex flex-col min-h-full">
        <ChatroomSidebarHeader />
        <div className="flex-1">
          {chats.map((chat) => (
            <ChatroomList key={chat.messagesWith} chat={chat} />
          ))}
        </div>
        <ChatroomSidebarFooter />
      </div>
      <div className="flex flex-col flex-1 min-h-[90vh]">
        <ChatroomMainHeader />
        <ChatroomMainRoom />
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps({ req, res }) {
  try {
    // get server side cookies
    const token = req.cookies.token;
    let chats = await axios.get('http://localhost:3000/api/chats', {
      headers: {
        Authorization: token
      }
    });
    if (!chats.data) {
      return {
        notFound: true
      };
    }
    return {
      props: {
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
