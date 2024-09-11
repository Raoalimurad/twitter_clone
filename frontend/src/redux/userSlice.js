import {createSlice} from '@reduxjs/toolkit'
const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        otherUsers:null,
        profile:null,
        loading:true
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers = action.payload
        },
        setProfile:(state,action)=>{
            state.profile = action.payload
        },
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        followingUpdates:(state,action)=>{
            // unfollow
           if(state.user.following.includes(action.payload)){
                 state.user.following = state.user.following.filter((itemId)=>{
                    return itemId !== action.payload
                 })
           }else{
             state.user.following.push(action.payload)
           }
        }
    }
})

export const {setUser,setOtherUsers,setProfile,followingUpdates,setLoading} = userSlice.actions
export default userSlice.reducer