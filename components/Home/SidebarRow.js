import React from 'react'
import Image from 'next/image'
const SidebarRow = ({src, Icon, title}) => {
  return (
    <div className="flex items-center space-x-2 p-4">
      {
        src&& (
          <Image width={30} height={30} layout="fixed" className="rounded-full" src={src}/>
        )
      }
      {
        Icon && (
          <Icon className="h-8 w-8 text-blue-600 "/>
        )
      }
      <p className="hidden sm:inline-flex font-medium ml-3">{title}</p>
    </div>
  )
}

export default SidebarRow
