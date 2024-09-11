import React, { useEffect } from 'react'
import LeftSideBar from '../Components/LeftSideBar'
import RightSideBar from '../Components/RightSideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import useGetTweets from '../hooks/useGetTweets'
import { useSelector } from 'react-redux'



const Home = () => {
  const {user} = useSelector(store=>store.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user){
     navigate('/login')
    }
  },[])
useGetOtherUsers();
useGetTweets()

  return (
    <div className='flex justify-between w-[80%] mx-auto'>
        <LeftSideBar/>
       <Outlet/>
        <RightSideBar/>

    </div>
  )
}

export default Home