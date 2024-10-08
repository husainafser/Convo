import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:'posts',
    initialState:{
       posts : [],
       loading : false,
       error : null,
    },
    reducers : {
        fetchPostStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        fetchPostSuccess:(state,action)=>{
            state.loading = false;
            state.posts = action.payload;
        },
        fetchPostFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        addPost:(state,action)=>{
             state.posts.push(action.payload);
        }
    }
})
export const {fetchPostStart,fetchPostSuccess,fetchPostFailure} = postSlice.actions;
export default postSlice.reducer;