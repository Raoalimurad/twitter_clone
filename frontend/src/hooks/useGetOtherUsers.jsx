import axios from 'axios';
import { useEffect } from 'react';
import { USER_API_END_POINT } from '../ultils/Constant';
import { useDispatch } from 'react-redux';
import { setOtherUsers,  } from '../redux/userSlice';

const useGetOtherUsers = (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getOtheUsers = async () => {
            try {
                const response = await axios.get(`${USER_API_END_POINT}/otherUsers`, { withCredentials: true });
                const result = response?.data;
                if (result.success) {
                    dispatch(setOtherUsers(result?.users))
                }
            } catch (error) {
                console.log('Error:', error.message);
            }
        };


        getOtheUsers();

    }, [id, dispatch]);
};

export default useGetOtherUsers;
