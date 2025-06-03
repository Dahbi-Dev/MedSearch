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
    image: "https://source.unsplash.com/random/400x300?city",
    title: "Visite de Casablanca",
    author: "Hafssa Sabil",
    datePosted: "02 juin 2025",
    description: "Une journée pleine de découvertes dans la capitale économique.",
    location: "Casablanca, Maroc"
  }
];

const AllPosts = () => {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">Blog</h2>
      {postsData.map((post) => (
        <Post
          key={post.id}
          image={post.image}
          title={post.title}
          author={post.author}
          datePosted={post.datePosted}
          description={post.description}
          location={post.location}
        />
      ))}
    </section>
  );
};

export default AllPosts;
