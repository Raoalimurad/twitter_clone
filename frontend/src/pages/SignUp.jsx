import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import axios from "axios"
import { USER_API_END_POINT } from '../ultils/Constant'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/userSlice';
import { Loader2 } from 'lucide-react';
const SignUp = () => {
  // for taking inputs
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [photo,setPhoto ] = useState("")
  // use for navigate
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector(store=>store.user)
  // image handler
  const onPhotoHandler = (e)=>{
      setPhoto(e.target.files[0])
  }
  // register function 
  const handleRegister = async () => {
    try {
       const userData = new FormData()
       userData.append('name',name)
       userData.append('username',username)
       userData.append('email',email)
       userData.append('password',password)
       userData.append('photo',photo)
      dispatch(setLoading(true))
      const response = await axios.post(`${USER_API_END_POINT}/register`,userData)
      const result = response.data
      if (result.success) {
        toast.success(result.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      dispatch(setLoading(false))
    }
  }
  
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='flex items-center justify-around w-[80%]'>
        <div>
          <img width={'370px'} className='' src="https://tse3.mm.bing.net/th?id=OIP.K23ibJJG7RQQybFSgC_ZegHaHa&pid=Api&P=0&h=220" alt="twiter-img" />
        </div>
        <div>
          <h1 className='text-6xl font-bold my-5'>
            Happening now.
          </h1>
          <h1 className='mt-4 mb-2 font-bold text-2xl'>Register</h1>
          <div className='w-[50%]'>


            <div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full mt-2 font-semibold w-full' placeholder='Name' />
            </div>
            <div>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full mt-2 font-semibold w-full' placeholder='username' />
            </div>
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full mt-2 font-semibold w-full' placeholder='Email' />
            </div>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full mt-2 font-semibold w-full' placeholder='Password' />
            </div>
            <div>
              <input type="file" accept='image/*' onChange={onPhotoHandler} className='mt-4 rounded-md cursor-pointer border-black px-3' />
            </div>
            
            <div>
            {
                loading ? (
                  <button className="px-2 py-2 rounded-full font-semibold bg-blue-500 w-full my-4 text-lg text-white flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </button>
                ) : (
                  <button
                    className="px-2 py-2 rounded-full font-semibold bg-blue-500 w-full my-4 text-lg text-white flex items-center justify-center"
                    onClick={handleRegister}
                  >
                    SignUp
                  </button>
                )
              }
              <p>Already have an accout ? <span className='text-blue-500 font-bold'><Link to='/login'>Login</Link></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp