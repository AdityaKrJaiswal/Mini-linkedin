import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import PostCard from '../components/PostCard';
import CreatePost from './CreatePost';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost.post, ...prevPosts]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to MiniLinkedIn 🚀</h1>
          <p className="text-sm text-gray-500 mt-1">Share your thoughts with the community</p>
        </div>

        {/* Create Post */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition duration-300">
          <CreatePost onPostCreated={handlePostCreated} />
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts
              .filter(post => post && post._id)
              .map(post => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100"
                >
                  <PostCard post={post} />
                </div>
              ))
          ) : (
            <div className="text-center text-gray-500">No posts found 😞</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
