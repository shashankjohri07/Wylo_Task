import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, updatePost } from "../store/slices/postSlice";
import { Pencil, Check, UploadCloud, Trash } from "lucide-react";

const PostList = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleEdit = (post) => {
    setEditMode(post.id);
    setEditText(post.text);
    setEditImage(null);
    setPreview(post.image);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleUpdate = (id) => {
    const imageUrl = editImage ? URL.createObjectURL(editImage) : preview;

    // Find the post and update its content
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, text: editText, image: imageUrl } : post
    );

    dispatch(updatePost({ id, text: editText, image: imageUrl }));

    // Save the updated list to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setEditMode(null);
    setEditImage(null);
    setPreview(null);
  };

  const handleDelete = (post) => {
    const updatedPosts = posts.filter((p) => p.id !== post.id);

    dispatch(deletePost(post.id));

    // Save the updated list to localStorage
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="mt-6 space-y-6 max-w-4xl mx-auto">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:shadow-xl transition-all"
        >
          {editMode === post.id ? (
            <div className="space-y-4">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 rounded-lg text-lg font-medium"
              />

              {!preview && (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg cursor-pointer hover:bg-gray-50">
                  <UploadCloud size={30} className="text-blue-500" />
                  <span className="text-gray-600 mt-1">Change Image</span>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              )}

              {/* Preview Image */}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md shadow-md"
                />
              )}

              <button
                onClick={() => handleUpdate(post.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center space-x-2 shadow-md hover:scale-105 transition-transform"
              >
                <Check size={20} />
                <span>Save Changes</span>
              </button>
            </div>
          ) : (
            <div>
              <p className="text-gray-900 text-lg font-medium break-words">
                {post.text}
              </p>

              {/* Display Post Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full mt-3 rounded-lg shadow-md"
                />
              )}

              <div className="flex justify-between ">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-4 py-2 mt-3 rounded-lg flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer bg-gray-200"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="px-4 py-2 mt-3 rounded-lg flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer bg-red-400"
                  >
                    <Trash size={16} />
                  </button>
                </div>
                <p className="mt-4">{formatDate(post.date)}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
