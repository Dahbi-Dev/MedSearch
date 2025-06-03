// src/posts/AllPosts.jsx
import React from "react";
import Post from "./Post";

const postsData = [
  {
    id: 1,
    image: "https://source.unsplash.com/random/400x300?nature",
    title: "Découvrir les montagnes",
    author: "Hafssa Sabil",
    datePosted: "03 juin 2025",
    description: "Une aventure passionnante dans les montagnes de l'Atlas.",
    location: "Ifrane, Maroc"
  },
  {
    id: 2,
    image: "src/img/pexels-pixabay-40568.jpg",
    title: "Visite de Casablanca",
    author: "Hafssa Sabil",
    datePosted: "02 juin 2025",
    description: "Une journée pleine de découvertes dans la capitale économique.",
    location: "Casablanca, Maroc"
  }
];

const AllPosts = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 bg-red-500">Blog Posts</h2>
      <div className="flex space-x-6 overflow-x-auto">
        {postsData.map((post) => (
          <div key={post.id} className="w-80 flex-shrink-0">
            <Post {...post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
