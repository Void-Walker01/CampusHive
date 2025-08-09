import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import apiClient from '../api/axios'; // 1. Import the new client

function PostCard({ post, onDelete }) {
  const { currentUser } = useAuth();
  const isAuthor = currentUser && post.author && currentUser._id === post.author._id;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      // 2. Use the new apiClient
      await apiClient.delete(`/posts/${post._id}`);
      onDelete(post._id);
    } catch (error) {
      console.error(error.response?.data?.message || error.message || 'Failed to delete post');
    }
  };

  if (!post.author) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <Link to={`/profile/${post.author._id}`} className="flex items-center gap-3">
          <img
            src={post.author.profilePic || `https://ui-avatars.com/api/?name=${post.author.firstName}+${post.author.lastName}&background=4f46e5&color=fff`}
            alt="author"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-white hover:underline">{post.author.firstName} {post.author.lastName}</p>
            <p className="text-sm text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </Link>
        {isAuthor && (
          <button onClick={handleDelete} className="text-gray-400 hover:text-red-500 p-2 rounded-full">
            <FiTrash2 size={20} />
          </button>
        )}
      </div>
      {post.content && <p className="text-gray-200 mb-4 whitespace-pre-wrap">{post.content}</p>}
      {post.image && (
        <div className="rounded-lg overflow-hidden">
          <img src={post.image} alt="post content" className="w-full h-auto object-cover" />
        </div>
      )}
    </div>
  );
}

export default PostCard;
