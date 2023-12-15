import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    UserData:null,
}

export const AuthSlice=createSlice({
    name:'Auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.UserData=action.payload;
        },
        logout:(state)=>{
            state.status=false;
            state.UserData=null
        },
    }
})

export default AuthSlice.reducer;
export const {login,logout} =AuthSlice.actions;