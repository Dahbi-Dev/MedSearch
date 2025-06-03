// src/posts/Post.jsx
import React from "react";

const Post = ({ image, title, author, datePosted, description, location }) => {
   return (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-20 overflow-hidden">
  <img
    src={image}
    alt={title}
    className="w-full h-full object-cover"
  />
</div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors duration-200">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Par <span className="font-medium text-gray-700">{author}</span> •{" "}
          <time dateTime={datePosted}>{datePosted}</time>
        </p>
        <p className="mt-2 text-gray-700 text-sm leading-relaxed">
          {description}
        </p>
        <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
          <span>📍</span> {location}
        </p>
      </div>
    </div>
  );
};

export default Post;
