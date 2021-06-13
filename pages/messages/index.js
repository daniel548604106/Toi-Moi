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
import { useSelector } from 'react-redux';
const io = require('socket.io-client');

const Index = (props) => {
  const router = useRouter();
  const socket = useRef();
  const [chats, setChats] = useState(props.chats);
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [openChatUser, setOpenChatUser] = useState({
    name: '',
    profileImage: ''
  });
  const userInfo = useSelector((state) => state.user.userInfo);

  // This ref is for persisting the state of query string in url through re-renders
  // This ref is the query string inside url
  // useRef 神奇的地方除了可以在不 re-render 的狀態下更新值
  const openChatId = useRef();

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(process.env.BASE_URL);
    }

    if (socket.current) {
      socket.current.emit('join', { userId: userInfo._id });
      socket.current.on('connectedUsers', ({ users }) => {
        console.log('connected', users);
        users.length > 0 && setConnectedUsers(users);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.emit('disconnected');
        socket.current.off();
      }
    };
  }, []);

  useEffect(() => {
    if (chats.length > 0 && !router.query.message) {
      router.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
        shallow: true
      });
    }
  }, [chats]);

  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit('loadMessages', {
        userId: userInfo._id,
        messagesWith: router.query.message
      });

      socket.current.on('messagesLoaded', ({ chat }) => {
        // setMessages(chat.messages);
        setOpenChatUser({
          name: chat.messagesWith.name,
          profileImage: chat.messagesWith.profileImage
        });
        console.log(chat);
      });
    };

    if (socket.current) {
      loadMessages();
    }
  }, [router.query.message]);
  return (
    <div className="flex h-100vh  ">
      <div className="w-full p-2 xl:w-[500px] border-r-2  flex flex-col min-h-full">
        <ChatroomSidebarHeader />
        <div className="flex-1">
          {chats.map((chat) => (
            <ChatroomList
              connectedUsers={connectedUsers}
              key={chat.messagesWith}
              chat={chat}
            />
          ))}
        </div>
        <ChatroomSidebarFooter />
      </div>
      <div className="flex flex-col flex-1 min-h-[90vh]">
        <ChatroomMainHeader openChatUser={openChatUser} />
        <ChatroomMainRoom messages={messages} />
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
