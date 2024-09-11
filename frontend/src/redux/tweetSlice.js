import {createSlice} from "@reduxjs/toolkit"

const tweetSlice = createSlice({
    name:'tweet',
    initialState:{
         tweets:null,
         refresh:false,
         isActive:true
    },
    reducers:{
        setTweets:(state,action)=>{
            state.tweets = action.payload
        },
        setRefresh:(state)=>{
            state.refresh = !state.refresh
        },
        setIsActive:(state,action)=>{
            state.isActive = action.payload
        }
    }
})

export const {setTweets,setRefresh,setIsActive} = tweetSlice.actions
export default tweetSlice.reducer