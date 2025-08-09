import React, { useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/postCard';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axios'; // 1. Import the new client

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 2. Use the new apiClient
        const response = await apiClient.get('/posts');
        const data = response.data;

        console.log("Data received from /api/v1/posts:", data);

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

  if (loading) {
    return <div className="pt-24 text-center text-gray-400">Loading feed...</div>;
  }

  if (error) {
    return <div className="pt-24 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 pt-24 pb-8">
      {currentUser && <CreatePost onPostCreated={handlePostCreated} />}
      <div className="space-y-6 mt-8">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post._id} post={post} onDelete={handlePostDeleted} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            <h2 className="text-2xl font-bold">The feed is empty!</h2>
            <p>Be the first to share something with the campus.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
