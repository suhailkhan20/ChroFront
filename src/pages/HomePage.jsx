import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Accept searchQuery as a prop
const HomePage = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = 'https://chrolog.onrender.com/api/posts';

        // Check if there is a search query and update the URL accordingly
        if (searchQuery) {
          url = `https://chrolog.onrender.com/api/posts/search?query=${searchQuery}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error('Failed to fetch posts:', data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    // Use a slight delay to prevent an API call on every single keystroke
    const handler = setTimeout(() => {
        fetchPosts();
    }, 300);

    return () => {
        clearTimeout(handler);
    };
  }, [searchQuery]); // The useEffect hook will now re-run whenever the searchQuery prop changes

  if (loading) {
    return <div className="text-center mt-8 text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">
        {searchQuery ? 'Search Results' : 'All Posts'}
      </h1>
      
      {posts.length === 0 ? (
        <p className="text-center text-gray-400">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post._id} className="dark:bg-gray-900 text-white p-6 rounded-lg shadow-md hover:shadow-gray-950 transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-white mb-4">{post.content.substring(0, 100)}...</p>
              <p className="text-sm text-white">By: {post.author.firstname} {post.author.lastname}</p>
              <Link to={`/post/${post._id}`} className="mt-4 inline-block text-blue-500 hover:underline">
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
