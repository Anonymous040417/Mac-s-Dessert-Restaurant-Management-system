import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "../../features/apis/Authapi";

 export const store=configureStore({
    reducer:{
        [AuthApi.reducerPath]:AuthApi.reducer,

    }
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch