import React from 'react'
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { USER_API_END_POINT } from '../ultils/Constant';
import { setOtherUsers, setProfile, setUser } from '../redux/userSlice';
import { setTweets } from '../redux/tweetSlice';

const LeftSideBar = () => {
    const {user} = useSelector(store=>store.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandle = async ()=>{
        try {
            const response = await axios.get(`${USER_API_END_POINT}/logout`)
            const result = response.data
            if(result.success){
                toast.success(result.message)
                dispatch(setUser(null))
                dispatch(setOtherUsers(null))
                dispatch(setProfile(null))
                dispatch(setTweets(null))

                 navigate('/login')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className='w-[20%]'>

            <div>
                <img width={'70px'} className='ml-2 mt-1' src="https://tse3.mm.bing.net/th?id=OIP.K23ibJJG7RQQybFSgC_ZegHaHa&pid=Api&P=0&h=220" alt="twiter-img" />
            </div>

            <div className='my-4'>
                <Link to='/' className='flex gap-2 items-center cursor-pointer my-2 py-2 px-4 hover:bg-gray-200 rounded-md'>
                    <IoMdHome size='25px' /> <h3 className='font-bold text-xl'>Home</h3>
                </Link>

                <div className='flex gap-2 items-center cursor-pointer my-2 py-2 px-4 hover:bg-gray-200 rounded-md'>
                    <FaSearch size='23px' /> <h3 className='font-bold text-xl'>Explore</h3>
                </div>

                <div className='flex gap-2 items-center cursor-pointer my-2 py-2 px-4 hover:bg-gray-200 rounded-md'>
                    <IoIosNotifications size='25px' /> <h3 className='font-bold text-xl'>Notifications</h3>
                </div>

                <Link to={`/profile/${user?._id}`} className='flex gap-2 items-center cursor-pointer my-2 py-2 px-4 hover:bg-gray-200 rounded-md'>
                    <FaUser size='20px' /> <h3 className='font-bold text-xl'>Profile</h3>
                </Link>

                <div className='flex gap-2 items-center cursor-pointer my-2 py-2 px-4 hover:bg-gray-200 rounded-md'>
                    <FaBookmark size='25px' /> <h3 className='font-bold text-xl'>Bookmarks</h3>
                </div>

                <div className='flex gap-2 items-center cursor-pointer my-2 py-2 px-4 hover:bg-gray-200 rounded-md' onClick={logoutHandle}>
                    <MdLogout size='25px' /> <h3 className='font-bold text-xl'>Logout</h3>
                </div>

                <div>
                    <button className='bg-blue-500 px-4 py-2 text-white text-xl font-bold w-full rounded-full'>Post</button>
                </div>

            </div>
        </div>
    )
}

export default LeftSideBar