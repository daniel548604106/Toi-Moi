import React from 'react'
import { signIn } from 'next-auth/client'

const Index = () => {
  return (
    <div  className="h-screen flex justify-center items-center">
      <button onClick={signIn} className="bg-blue-600 p-2 text-white rounded-md">Login</button>
    </div>
  )
}

export default Index
