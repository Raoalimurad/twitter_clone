import React from 'react'
import Avatar from 'react-avatar';
import { IoArrowBack } from "react-icons/io5";
import {Link, useParams} from 'react-router-dom'
import useGetProfile from '../hooks/useGetProfile';
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { USER_API_END_POINT } from '../ultils/Constant';
import { followingUpdates } from '../redux/userSlice';
import { setRefresh } from '../redux/tweetSlice';

const Profile = () => {
  const {profile,user} = useSelector(store=>store.user)
  const {id} = useParams()
  const dispatch = useDispatch()


  useGetProfile(id)

  const followUnFollowHandler = async ()=>{
    
      if(user?.following?.includes(id)){
        try {
          const response = await axios.put(`${USER_API_END_POINT}/unfollow/${id}`,{},{withCredentials:true})
          const result = response.data
          if(result.success){
            dispatch(followingUpdates(id))
            dispatch(setRefresh())
            toast.success(result.message)
          }
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
        }

      }else{
        try {
          const response = await axios.post(`${USER_API_END_POINT}/follow/${id}`,{},{withCredentials:true})
          const result = response.data
          if(result.succes){
            dispatch(followingUpdates(id))
            dispatch(setRefresh())
            toast.success(result.message)
          }
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
        }
      }
     
    
  }
  return (
    <div className='w-[50%] border-l border-r border-gray-200 px-1'>
      <div>
        <div className='flex items-center gap-3 py-2'>
          <Link to='/' className='p-2 rounded-full text-center cursor-pointer font-bold hover:bg-gray-300'>
        <IoArrowBack size={'22px'} />
          </Link>
        <div>
          <h1 className='text-xl font-bold'>{profile?.name}</h1>
          <p className='text-gray-600  font-semibold'>10 posts</p>
        </div>
        </div>
        <img src='https://tse1.mm.bing.net/th?id=OIP.jOtowa9XkqzmGvzVu8TwGQHaEo&pid=Api&P=0&h=220' alt="banner" className='w-full h-40 object-cover'/>
        <div className='absolute top-44 border-4 border-white rounded-full'>
         <Avatar src={profile?.userImg} size="120" round={true} className='cursor-pointer'/>
         </div>
         <div className='text-right mt-3'>
          {
            profile?._id == user?._id ?(
<button className='px-4 py-2 border border-gray-400 rounded-full font-semibold hover:bg-gray-200'>Edit Profile</button>
            ):(
<button className='px-4 py-1  text-white mt-3 bg-black  rounded-full font-semibold ' onClick={followUnFollowHandler}> {user?.following?.includes(id)?'Following':'Follow'}</button>
            )
          }
         
         </div>
         <div className='mt-4 ml-4'>
          <h1 className='font-bold text-xl'>{profile?.name}</h1>
          <p>@{profile?.username}</p>
         </div>
         <div className='m-4 text-sm text-gray-700'>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quia tenetur corporis nihil fuga, quas eveniet repellat veniam aspernatur veritatis!</p>
         </div>
      </div>
    </div>
  )
}

export default Profile