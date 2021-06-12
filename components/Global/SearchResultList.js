import React from 'react'
import DefaultAvatar from '../../public/vercel.svg'
import {useRouter} from 'next/router'
import Image from 'next/image'
const SearchResultList = ({username, name,profileImage,searchText,Icon}) => {
  const router = useRouter()
  return (
    <div className="flex items-center p-[10px] rounded-md hover:bg-gray-200 " onClick={() => router.push(`/${username}`) }>
      {
        name && (
            profileImage ? (
              <Image className="rounded-full" layout="fixed" src={profileImage}  width={40} height={40} />
            )
            :(
              <>
              <Image className="rounded-full" layout="fixed" src={DefaultAvatar}  width={40} height={40} />
              <p className="ml-[10px] font-medium">{name}</p>
              </>
            )     
        )
      }
      {
        searchText && (
          <>
          <Icon className="rounded-full w-[40px] h-[40px] p-2 bg-blue-600 text-white" />
          <p className="ml-[10px] font-medium text-blue-600">搜尋 {searchText}</p>
          </>
        )
      }
    </div>
  )
}

export default SearchResultList
