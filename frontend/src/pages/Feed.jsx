// src/pages/Feed.jsx

import React, { useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/postCard';
import UpdatePost from '../components/UpdatePost'; // 1. Import the new component
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axios';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // 2. Add state to manage the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get('/posts');
        const data = response.data;
        if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.error("API did not return an array of posts. Received:", data.data);
          setPosts([]);  
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts(posts.filter(post => post._id !== deletedPostId));
  };

  // 3. Add a handler to update a post in the list
  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => (post._id === updatedPost._id ? updatedPost : post)));
    // We don't need to close the modal here, the UpdatePost component does it.
  };

  // 4. Functions to control the modal
  const handleOpenEditModal = (post) => {
    setPostToEdit(post);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setPostToEdit(null);
  };

  if (loading) return <div className="pt-24 text-center text-gray-400">Loading feed...</div>;
  if (error) return <div className="pt-24 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto max-w-2xl px-4 pt-24 pb-8">
      {currentUser && <CreatePost onPostCreated={handlePostCreated} />}
      <div className="space-y-6 mt-8">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard 
              key={post._id} 
              post={post} 
              onDelete={handlePostDeleted} 
              onEdit={handleOpenEditModal} // 5. Pass the open modal function
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            <h2 className="text-2xl font-bold">The feed is empty!</h2>
            <p>Be the first to share something with the campus.</p>
          </div>
        )}
      </div>

      {/* 6. Conditionally render the modal */}
      {isEditModalOpen && (
        <UpdatePost 
          post={postToEdit}
          onUpdate={handlePostUpdated}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}

export default Feed;