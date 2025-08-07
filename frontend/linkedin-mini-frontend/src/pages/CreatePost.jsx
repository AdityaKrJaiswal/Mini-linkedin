import React, { useState } from 'react';
import API from '../api/axios';

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const res = await API.post(
        '/posts',
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent('');
      onPostCreated(res.data);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition-shadow duration-300"
    >
      <textarea
        rows={4}
        className="
          w-full
          p-3
          border
          border-gray-300
          rounded-lg
          resize-none
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition
          placeholder-gray-400
          mb-4
        "
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        type="submit"
        disabled={!content.trim()}
        className={`
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-lg
          font-semibold
          hover:bg-blue-700
          focus:outline-none
          focus:ring-4
          focus:ring-blue-400
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        `}
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;
