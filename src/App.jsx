import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Provider store={store}>
        <div className="min-h-screen bg-gradient-to-b from-black to-indigo-600 p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white text-center my-6">
              FeedFlow
            </h1>
            <PostForm />
            <PostList />
          </div>
        </div>
      </Provider>
    </>
  );
}

export default App;
