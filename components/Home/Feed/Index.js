import React from 'react'
import Stories from './Stories'
import InputBox from './InputBox'
import Post from './Post'
const Index = () => {
  return (
    <div className="flex-grow sm:px-5 sm:mx-0 xl:px-10 xl:mx-10">
      <Stories/>
      <InputBox/>
      <Post/>
    </div>
  )
}

export default Index
