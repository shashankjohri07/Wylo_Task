import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../store/slices/postSlice";
import { UploadCloud, XCircle } from "lucide-react";

const PostForm = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [, setIsDisableBtn] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    dispatch(addPost({ text, image: preview }));

    setText("");
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    setIsDisableBtn(true);
    setTimeout(() => setIsDisableBtn(false), 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-xl p-5 space-y-4 border border-gray-200 max-w-4xl mx-auto transition-all duration-300 hover:shadow-2xl"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something amazing..."
        className="w-full border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-3 rounded-lg resize-none text-lg font-medium placeholder-gray-400"
      />

      {!preview && (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-5 rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
          <UploadCloud size={30} className="text-blue-500" />
          <span className="text-gray-600 mt-2">Click to Upload</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      )}

      {/* Image Preview */}
      {preview && (
        <div className="relative mt-3">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg shadow-md"
          />
          <button
            onClick={() => {
              setImage(null);
              setPreview(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
          >
            <XCircle size={20} />
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={!text && !image}
        className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-5 py-3 rounded-lg shadow-md  ${
          !text && !image
            ? "cursor-not-allowed opacity-50"
            : "hover:scale-105 transition-transform"
        }`}
      >
        Post Now 🚀
      </button>
    </form>
  );
};

export default PostForm;
