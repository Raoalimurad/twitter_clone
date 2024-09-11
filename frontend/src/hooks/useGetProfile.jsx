import axios from 'axios';
import { useEffect } from 'react';
import { USER_API_END_POINT } from '../ultils/Constant';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/userSlice';

const useGetProfile = (id) => {
    const dispatch = useDispatch();
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{ withCredentials: true });
        const result = response?.data;
        if (result.success) {
            dispatch(setProfile(result?.user))
        }
      } catch (error) {
        console.log('Error:', error.message); 
      }
    };

    if (id) {
      getUserProfile();
    }
  }, [id,dispatch]);
};

export default useGetProfile;
