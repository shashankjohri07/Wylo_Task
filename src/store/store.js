import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";

const store = configureStore({
    reducer: { posts: postReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }) // serializable check is disabled
});

export default store;
