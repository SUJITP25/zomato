import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    userId : null ,
    userToken : null
}


const userSlice = createSlice({
    name: 'auth', 
    initialState, 
    reducers: {
        setUserId: (state,action)=>{
            state.userId = action.payload
        }, 
        setUserToken : (state,action) =>{
            state.userToken = action.payload 
        }
    }
})


export const {setUserId,setUserToken} = userSlice.actions; 
export default userSlice.reducer