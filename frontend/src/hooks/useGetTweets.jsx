import axios from 'axios';
import { useEffect } from 'react';
import { TWEET_API_END_POINT } from '../ultils/Constant';
import { useDispatch, useSelector } from 'react-redux';

import { setTweets } from '../redux/tweetSlice';

const useGetTweets = () => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector(store => store.tweet)

    // all tweets
    const getTweets = async () => {
        try {
            const response = await axios.get(`${TWEET_API_END_POINT}/allTweets`, { withCredentials: true });
            const result = response?.data;
            if (result.success) {
                dispatch(setTweets(result?.tweets))
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    };


    // following tweet function
    const followingTweetsHandler = async () => {
        try {
            const response = await axios.get(`${TWEET_API_END_POINT}/FollowingTweets`, { withCredentials: true })
            const result = response.data
            if (result.success) {
                dispatch(setTweets(result.tweets))
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    useEffect(() => {
       if(isActive){
        getTweets();
       }else{
        followingTweetsHandler()
       }
    }, [refresh,isActive]);
};

export default useGetTweets;
