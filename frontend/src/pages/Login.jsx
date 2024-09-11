import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../ultils/Constant'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../redux/userSlice'
const Login = () => {
  // for taking inputs
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {loading} = useSelector(store=>store.user)
  const dispatch = useDispatch()
  // for navigate to page
  const navigate = useNavigate()


  // login function 
  const handleLogin = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${USER_API_END_POINT}/login`, { email, password }, { withCredentials: true })
      const result = response?.data
      if (result.success) {
        dispatch(setUser(result?.user))
        toast.success(result.message)
        setEmail("")
        setPassword("")
        navigate('/')
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
          <h1 className='mt-4 mb-2 font-bold text-2xl'>Login</h1>
          <div className='w-[50%]'>
            <div>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full mt-2 font-semibold w-full' placeholder='Email' />
            </div>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='outline-blue-500 border border-gray-800 px-3 py-1 rounded-full mt-2 font-semibold w-full' placeholder='Password' />
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
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                )
              }

              <p>Don't have an account <span className='text-blue-500 font-bold'><Link to='/signup'>Register</Link></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login