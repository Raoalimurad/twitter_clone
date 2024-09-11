import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import { FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const RightSideBar = () => {
  const { otherUsers } = useSelector(store => store.user)||  { otherUsers: [] }
  const [search,setSerach] = useState('')
  const [filterUsers,setFilterUsers] = useState(otherUsers)
    useEffect(()=>{
      const filterdUser = otherUsers?.length > 0 ? otherUsers.filter((user)=>{
        if(!search){
          return true;
        }
        return user?.name?.toLowerCase().includes(search.toLowerCase())
      }):[]
      setFilterUsers(filterdUser)
    },[otherUsers,search])

  return (
    <div className='w-[30%] ml-2 mt-4'>
      <div>
        <div className=' flex items-center bg-gray-200 p-2  rounded-full w-full ml-2'>
          <FaSearch className='text-lg' />
          <input type="text" value={search} onChange={(e)=>setSerach(e.target.value)} className='bg-transparent border-none outline-none px-2 w-[80%] text-gray-500' placeholder='Search' />
        </div>

        <div className='p-5 bg-gray-100'>
          <h1 className='my-1 font-bold text-xl'>Who to follow</h1>
          {
            filterUsers?.map((user) => {
              return (
                <div className='flex justify-between w-full my-4 border-b border-gray-200' key={user?._id}>
                  <div className='flex'>
                    <Avatar src={user?.userImg} size="60" round={true} className='cursor-pointer' />
                    <div className=''>
                      <h1 className='font-bold'>{user?.name}</h1>
                      <p className='text-gray-500 text-sm'>@{user?.username}</p>
                    </div>
                  </div>
                  <div>
                    <Link to={`/profile/${user?._id}`}>
                    <button className='bg-black px-2 py-2 text-white rounded-full w-[90px]'>Profile</button>
                    </Link>
                  
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default RightSideBar