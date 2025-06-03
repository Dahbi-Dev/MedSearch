// src/posts/Post.jsx
import React from "react";
import AllPosts from "./AllPosts";


const Post = ({ image, title, author, datePosted, description, location }) => {
  return (
    <div className="max-w-md mx-auto mb-6 border rounded-lg shadow p-4">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-600">Par <span className="font-medium">{author}</span> - {datePosted}</p>
      <p className="text-gray-800 mt-2">{description}</p>
      <p className="text-sm text-gray-500 mt-2">📍 {location}</p>
    </div>
  );
};

export default Post;
