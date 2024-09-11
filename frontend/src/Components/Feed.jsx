import React from 'react'
import CreatePost from './feedComponents/CreatePost'
import Tweet from './feedComponents/Tweet'
import { useSelector } from 'react-redux';
const Feed = () => {
  const {tweets} = useSelector(store=>store.tweet)
  return (
    <div className='w-[50%] border border-gray-200'>
        <CreatePost/>
        {
          tweets?.map((tweet)=>  <Tweet key={tweet?._id} tweet={tweet}/>)
        }
      
       
    </div>
  )
}

export default Feed