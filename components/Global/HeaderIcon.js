import React from 'react'

const HeaderIcon = ({Icon,active}) => {
  return (
    <div className="cursor-pointer text-gray-600 px-[10px] xl:px-[30px] h-14 flex items-center active:border-b-2 group active:border-blue-500  hover:bg-gray-100 rounded-md">
      <Icon className={`h-5 sm:h-7 group-hover:text-blue-600 ${active && 'text-blue-600'}`}/>
    </div>
  )
}

export default HeaderIcon