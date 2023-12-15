import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Auth_Slice'
const Store=configureStore({
   reducer:{
            Auth:AuthReducer
         }
}) 

export default Store