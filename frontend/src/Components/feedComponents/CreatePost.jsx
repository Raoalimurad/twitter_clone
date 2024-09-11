import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from "axios"
import Avatar from 'react-avatar';
import { useRef } from 'react';
import { RiGalleryLine } from "react-icons/ri";
import { TWEET_API_END_POINT } from '../../ultils/Constant';
import { useDispatch, useSelector } from 'react-redux'
import { setIsActive, setRefresh,  } from '../../redux/tweetSlice';
const CreatePost = () => {
  const [description, setDescription] = useState('')
  const [photo,setPhoto] = useState('')
  const dispatch = useDispatch()
  const fileInputRef = useRef(null);
  const {isActive} = useSelector(store=>store.tweet)
  const handleIconClick = () => {
    fileInputRef.current.click(); // Simulate a click on the hidden file input
  };
 const handlePhotoChange = (e)=>{
  setPhoto(e.target.files[0]);
 }

  const createPostHandler = async () => {
    try {
      const tweetData = new FormData()
      tweetData.append('description',description)
      tweetData.append("photo", photo);
      const response = await axios.post(`${TWEET_API_END_POINT}/createTweet`, tweetData, { withCredentials: true })
      const result = response.data
      if(result.success){
         toast.success(result.message)
         setDescription("")
         dispatch(setRefresh())
      }
      

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  //  following and  for you function
  const forYouHandler = ()=>{
     dispatch(setIsActive(true))
  }

  const followingHandler = ()=>{
    dispatch(setIsActive(false))
  }

  return (
    <div className='w-[100%]  mt-4'>

      <div className='flex items-center justify-evenly border-b border-gray-300'>
        <h2 className={`font-bold text-gray-700 text-xl cursor-pointer hover:bg-gray-300 px-4 py-1 ${isActive?'border-b-4 border-blue-500':''} hover:rounded-sm`} onClick={forYouHandler}>For you</h2>
        <h2 className={`font-bold text-gray-700 text-xl cursor-pointer hover:bg-gray-300 px-4 py-1 ${!isActive?'border-b-4 border-blue-500':''} hover:rounded-sm`} onClick={followingHandler} >Following</h2>
      </div>

      <div className='my-4 px-1 flex items-center gap-1 '>
        <div>
          <Avatar src="https://tse3.mm.bing.net/th?id=OIP.Lpx9j83qR_cfQuaPHuvwWQHaHw&pid=Api&P=0&h=220" size="60" round={true} className='cursor-pointer' />
        </div>

        <div>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='What is happening?' className='w-full border-none outline-none text-lg' />
        </div>
      </div>

      {/* post  */}

      <div className='flex items-center justify-between px-1 py-3 border-b border-gray-300'>
        <RiGalleryLine size='22px' className='cursor-pointer text-blue-500' onClick={handleIconClick} />
        <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handlePhotoChange} 
      />

        <button className='bg-blue-500 px-4 py-1 text-white text-md font-bold  rounded-full hover:bg-blue-600' onClick={createPostHandler}>Post</button>
      </div>


    </div>
  )
}

export default CreatePost