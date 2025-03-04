import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";

const store = configureStore({
    reducer: { posts: postReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }) 
});

export default store;
