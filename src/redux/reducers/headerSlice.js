import { createSlice } from "@reduxjs/toolkit";


 export const hambergerSlice=createSlice({
    name:"hamberger"
    ,
    initialState:{
        headerToggle:false
    },
    reducers:{
        hambergerToggle:(state)=>{
            state.headerToggle=!state.headerToggle
        }
    }
    
})
export const {hambergerToggle}=hambergerSlice.actions
export default hambergerSlice.reducer