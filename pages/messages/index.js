import React, { useEffect, useRef, useState } from 'react';
import { apiGetChats, apiGetChatUserInfo } from '../../api/index';
import axios from 'axios';
import ChatroomSidebarHeader from '../../components/Messages/ChatroomSidebar/ChatroomSidebarHeader';
import ChatroomList from '../../components/Messages/ChatroomSidebar/ChatroomList';
import ChatroomMainHeader from '../../components/Messages/ChatroomMain/ChatroomMainHeader';
import ChatroomMainRoom from '../../components/Messages/ChatroomMain/ChatroomMainRoom';
import ChatroomMainInputBox from '../../components/Messages/ChatroomMain/ChatroomMainInputBox';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import messageNotificationSound from '../../utils/messageNotificationSound';
import Image from 'next/image';
import { apiSearchRequest } from '../../api/index';
import genderAvatar from '../../utils/genderAvatar';
const io = require('socket.io-client');

const Index = (props) => {
  const router = useRouter();
  const socket = useRef();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [chats, setChats] = useState(props.chats || []);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [openChatUser, setOpenChatUser] = useState({
    name: '',
    profileImage: ''
  });

  const divRef = useRef(null);
  const scrollToBottom = (divRef) => {
    divRef.current !== null &&
      divRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // This ref is for persisting the state of query string in url through re-renders because on each re-render of component , the querystring will automatically reset
  // useRef 可以在不 re-render 的狀態下更新值
  const openChatId = useRef();

  const searchChat = async () => {
    try {
      const { data } = await apiSearchRequest(searchText);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!searchText) return;
    searchChat();
  }, [searchText]);

  const sendMsg = (msg) => {
    console.log('sentto', openChatId.current);
    if (socket.current) {
      socket.current.emit('sendMessage', {
        userId: userInfo._id,
        messageSentTo: openChatId.current,
        msg
      });
    }
  };

  const addChat = (result) => {
    const alreadyInChat =
      chats.length > 0 &&
      chats.filter((chat) => chat.messagesWith === result._id).length > 0;

    console.log(alreadyInChat, '?');
    if (alreadyInChat) {
      router.push(`/messages?message=${result._id}`);
    } else {
      const newChat = {
        messagesWith: result._id,
        name: result.name,
        profileImage: result.profileImage || genderAvatar(result.gender),
        lastMessage: '',
        date: Date.now()
      };

      console.log(openChatId);
      openChatId.current = result._id;
      setChats((chats) => [newChat, ...chats]);
      router.push(`/messages?message=${result._id}`);
    }
    // Clean search result
    setSearchResult([]);
    setSearchText('');
    // Open current chat
    setOpenChatUser({
      name: result.name,
      profileImage: result.profileImage || genderAvatar(result.gender)
    });
  };

  // Connection
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
    messages.length > 0 && scrollToBottom(divRef);
  }, [messages]);

  useEffect(() => {
    if (chats.length > 0 && !router.query.message) {
      router.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
        shallow: true
      });
    }
  }, []);

  // Load Messages

  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit('loadMessages', {
        userId: userInfo._id,
        messagesWith: router.query.message
      });

      socket.current.on('noChatFound', async () => {
        setMessages([]);
      });

      socket.current.on('messagesLoaded', ({ chat }) => {
        setMessages(chat.messages);
        setOpenChatUser({
          name: chat.messagesWith.name,
          profileImage: chat.messagesWith.profileImage
        });
        // tracking the query string in the url
        openChatId.current = chat.messagesWith._id;
        divRef.current && scrollToBottom(divRef);
      });
    };

    if (socket.current) {
      loadMessages();
    }
  }, [router.query.message]);

  // Confirming message has been sent and receiving messages
  useEffect(() => {
    if (socket.current) {
      socket.current.on('messageSent', ({ newMessage }) => {
        // We're doing this so that only the opened chat will push new messages so we don't air unopened chat
        if (newMessage.receiver === openChatId.current) {
          setMessages((messages) => [...messages, newMessage]);
          setChats((chats) => {
            const previousChat = chats.find((chat) => {
              return chat.messagesWith === newMessage.receiver;
            });
            previousChat.lastMessage = newMessage.msg;
            previousChat.date = newMessage.date;
            return [...chats];
          });
        }
      });

      socket.current.on('newMsgReceived', async ({ newMessage }) => {
        let senderName;
        // When chat is open inside the browser
        if (newMessage.sender === openChatId.current) {
          setMessages((prev) => [...prev, newMessage]);
          setChats((prev) => {
            const previousChat = prev.find(
              (chat) => chat.messagesWith === newMessage.sender
            );
            previousChat.lastMessage = newMessage.msg;
            previousChat.data = newMessage.date;
            senderName = previousChat.name;
            return [...prev];
          });
        } else {
          const ifPreviouslyMessaged =
            chats.filter((chat) => chat.messagesWith === newMessage.sender)
              .length > 0;

          if (ifPreviouslyMessaged) {
            setChats((prev) => {
              const previousChat = prev.find(
                (chat) => chat.messagesWith === newMessage.sender
              );
              previousChat.lastMessage = newMessage.msg;
              previousChat.date = newMessage.date;
              senderName = previousChat.name;
              return [...prev];
            });
          } else {
            const {
              data: { name, profileImage, gender }
            } = await apiGetChatUserInfo(newMessage.sender);
            senderName = name;
            console.log(',hi', name, profileImage);
            const newChat = {
              messagesWith: newMessage.sender,
              name,
              profileImage: profileImage || genderAvatar(gender),
              lastMessage: newMessage.msg
            };
            setChats((prev) => [newChat, ...prev]);
          }
        }

        messageNotificationSound(senderName);
      });
    }
  }, []);
  return (
    <div className="flex ">
      <div className="w-full hidden sm:flex  sm:max-w-[300px] lg:max-w-[500px] border-r-2  flex-col ">
        <ChatroomSidebarHeader
          setSearchText={setSearchText}
          searchText={searchText}
          addChat={addChat}
        />
        <div className="flex-1 overflow-y-auto ">
          {searchResult.length > 0
            ? searchResult.map((result) => (
                <div
                  key={result._id}
                  onClick={() => addChat(result)}
                  className="flex p-2 rounded-lg hover:bg-gray-100 cursor-pointer items-center"
                >
                  <Image
                    src={result.profileImage || genderAvatar(result.gender)}
                    width={30}
                    height={30}
                    className="cursor-pointer rounded-full"
                  />
                  <span className="ml-[10px]">{result.name}</span>
                </div>
              ))
            : chats.length > 0 &&
              chats.map((chat) => (
                <ChatroomList
                  setOpenChatUser={setOpenChatUser}
                  connectedUsers={connectedUsers}
                  key={chat.messagesWith}
                  chat={chat}
                />
              ))}
        </div>
      </div>
      <div className="flex-1  ">
        <ChatroomMainHeader
          connectedUsers={connectedUsers}
          openChatUser={openChatUser}
        />
        <ChatroomMainRoom
          divRef={divRef}
          sendMsg={sendMsg}
          socket={socket.current}
          user={userInfo}
          receiverProfileImage={openChatUser.profileImage}
          messagesWith={openChatId.current}
          messages={messages}
        />
        <ChatroomMainInputBox sendMsg={sendMsg} />
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
        Authorization: `Bearer ${token}`
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
