import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-lg uppercase mr-3 select-none">
          {post.user?.name ? post.user.name[0] : 'U'}
        </div>
        <div className="font-semibold text-gray-900">
          {post.user?.name || 'Unknown User'}
        </div>
      </div>

  
      <div className="text-gray-800 mb-4 whitespace-pre-wrap">
        {post.content || '[No content]'}
      </div>

      <div className="text-gray-400 text-sm italic">
        {post.createdAt
          ? new Date(post.createdAt).toLocaleString(undefined, {
              dateStyle: 'medium',
              timeStyle: 'short',
            })
          : 'Unknown date'}
      </div>
    </div>
  );
};

export default PostCard;
