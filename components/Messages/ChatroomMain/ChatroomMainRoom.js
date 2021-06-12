import React,{useState} from 'react'
import {PlusIcon,PhotographIcon,GiftIcon,ThumbUpIcon} from '@heroicons/react/solid'

const ChatroomMainRoom = () => {
  const [inputText,setInputText] = useState('')
  return (
    <div className="">
    <div className="flex-1 min-h-[80vh] overflow-y-auto shadow-md  flex-grow">
     room
    </div>
    <div className="p-2 flex items-center shadow-md">
      <div className="flex items-center space-x-2">
        <PlusIcon className="h-5 text-blue-600"/>
        <PhotographIcon className="h-5 text-blue-600"/>
        <GiftIcon className="h-5 text-blue-600"/>
      </div>
      <div className="rounded-xl  w-full ml-3">
        <form >
          <input  onChange={e => setInputText(e.target.value)}  className="w-full rounded-full py-2  px-5 focus:outline-none bg-gray-100 text-gray-500" placeholder="What's on your mind"/>
        </form>
      </div>
      <ThumbUpIcon className="h-6 text-blue-600 ml-2"/>
    </div>
    </div>

  )
}

export default ChatroomMainRoom


