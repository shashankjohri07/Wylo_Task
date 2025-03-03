import { createSlice, nanoid } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Load posts from localStorage
const loadFromLocalStorage = () => {
    const data = localStorage.getItem("posts");
    return data ? JSON.parse(data) : [];
};

// Save posts to localStorage
const saveToLocalStorage = (posts) => {
    localStorage.setItem("posts", JSON.stringify(posts));
};

const postSlice = createSlice({
    name: "posts",
    initialState: loadFromLocalStorage(),
    reducers: {
        addPost: (state, action) => {
            // Ensure the post has a unique ID
            const newPost = {
                id: action.payload.id || nanoid(), // Use existing ID if available
                text: action.payload.text,
                image: action.payload.image,
                date: action.payload.date || new Date(),
            };

            // Add the new post to the beginning of the array
            state.unshift(newPost);
            saveToLocalStorage(state);
            toast.success("Post added successfully! 🚀");
        },
        updatePost: (state, action) => {
            const { id, text, image } = action.payload;
            const post = state.find((post) => post.id === id);
            if (post) {
                post.text = text;
                post.image = image;
                saveToLocalStorage(state);
                toast.success("Post updated successfully! ✨");
            } else {
                toast.error("Post not found! ❌");
            }
        },
        deletePost: (state, action) => {
            const postId = action.payload;
            const postIndex = state.findIndex((post) => post.id === postId);
            if (postIndex !== -1) {
                state.splice(postIndex, 1);
                saveToLocalStorage(state);
                toast.success("Post deleted successfully! 🗑️");
            } else {
                toast.error("Post not found! ❌");
            }
        }
    },
});

export const { addPost, updatePost, deletePost } = postSlice.actions;

export default postSlice.reducer;
