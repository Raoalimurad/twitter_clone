import React from 'react'
import Avatar from 'react-avatar'
import { FaRegCommentDots } from "react-icons/fa";
import toast from "react-hot-toast"
import axios from 'axios'
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { TWEET_API_END_POINT } from '../../ultils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { setRefresh } from '../../redux/tweetSlice';
import { MdDelete } from "react-icons/md";
const Tweet = ({ tweet }) => {

    const {user} = useSelector(store=>store.user)
    const dispatch = useDispatch()
    const timeAgo = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt; // in milliseconds
      
        // Convert time differences into seconds, minutes, hours, and days
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        // Determine the appropriate time format
        if (seconds < 60) {
          return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
        } else if (minutes < 60) {
          return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
        } else if (hours < 24) {
          return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
          return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
      };
      
 
      

    const likeorDislikeHandler = async (id) => {
          try {
            const response = await axios.put(`${TWEET_API_END_POINT}/likeorDisLike/${id}`,{} ,{ withCredentials: true })
            const result = response.data
            if(result.success){
                toast.success(result.message)
                dispatch(setRefresh())
            }
          } catch (error) {
             console.log(error)
             toast.error(error.response.data.message)
          }
    }

    // delete twweet handler
    const deleteTweetHandler = async (id)=>{
        try {
            const response = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`,{withCredentials:true})
            const result = response.data
            if(result.success){
                toast.success(result.message)
                dispatch(setRefresh())
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='border-b border-gray-200'>
            <div className='my-2 py-3'>
                <div className='flex '>
                    <Avatar src={tweet?.userDetails?.[0]?.userImg} size="50" round={true} className='cursor-pointer' />
                    <div className='ml-2 w-full mt-1'>
                        <div className='flex items-center gap-1'>
                            <h1 className='font-bold'>{tweet?.userDetails?.[0]?.name}</h1>
                            <p className='text-gray-500 text-sm'>@{tweet?.userDetails?.[0]?.username}.{timeAgo(tweet?.createdAt)} </p>
                        </div>
                        <div>
                            <p>{tweet?.description}</p>
                        </div>
                        <div  className={`w-[500px] ${tweet?.tweetImg ? 'h-[350px]' : 'h-0'}`}>
                            <img src={tweet?.tweetImg} alt="tweet" className='w-full h-full object-cover rounded-md'/>
                        </div>
                        <div className='flex justify-between items-center py-4 px-1'>
                            <div className='flex gap-1 items-center cursor-pointer'>
                                <FaRegCommentDots size={'22px'}  />
                                <p className='text-gray-400'>0</p>
                            </div>
                            <div className='flex gap-1 items-center cursor-pointer'>
                                <CiHeart size={'22px'}  onClick={() => likeorDislikeHandler(tweet?._id)}/>
                                <p className='text-gray-400'>{tweet?.like?.length}</p>
                            </div>
                            <div className='flex gap-1 items-center cursor-pointer'>
                                <CiBookmark size={'22px'} />
                                <p className='text-gray-400'>0</p>
                            </div>
                            {
                              user?._id == tweet?.userId && (
                                <div className='flex gap-1 items-center cursor-pointer' onClick={()=>deleteTweetHandler(tweet?._id)}>
                                <MdDelete  size={'22px'} />
                            </div>
                              )
                            }
                           

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Tweet