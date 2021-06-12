import React from 'react'
import ChatroomSidebarHeader from '../../components/Messages/ChatroomSidebar/ChatroomSidebarHeader'
import ChatroomSidebarList from '../../components/Messages/ChatroomSidebar/ChatroomSidebarList'
import ChatroomSidebarFooter from '../../components/Messages/ChatroomSidebar/ChatroomSidebarFooter'
import ChatroomMainHeader from '../../components/Messages/ChatroomMain/ChatroomMainHeader'
import ChatroomMainRoom from '../../components/Messages/ChatroomMain/ChatroomMainRoom'

const Message = () => {
  return (
    <div className="flex h-100vh ">
      <div className="w-full xl:w-[500px] shadow-md flex flex-col min-h-full">
        <ChatroomSidebarHeader/>
        <ChatroomSidebarList/>
        <ChatroomSidebarFooter/>
      </div>
      <div className="flex flex-col flex-1 min-h-[90vh]">
        <ChatroomMainHeader/>
        <ChatroomMainRoom/>
      </div>
    </div>
  )
}

export default Message
