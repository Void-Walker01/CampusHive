import React, { useEffect, useState } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/postCard';
import { useAuth } from '../context/AuthContext';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/v1/posts', {
          credentials: 'include',
        });
        const data = await res.json();

        // DEBUGGING: Log the received data to the console
        console.log("Data received from /api/v1/posts:", data);

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch posts');
        }

        // SAFETY CHECK: Ensure the data is an array before setting it
        if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          // If data.data is not an array, set posts to an empty array to prevent crash
          console.error("API did not return an array of posts. Received:", data.data);
          setPosts([]); 
        }

      } catch (err) {
        setError(err.message);
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
        {/* We can now safely map over `posts` because we ensure it's always an array */}
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