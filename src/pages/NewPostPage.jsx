// src/pages/NewPostPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to create a post.');
      return navigate('/login');
    }

    try {
      const response = await fetch('http://localhost:5020/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Post creation error:', error);
    }
  };

  return (
    <div className="container mx-auto w-4xl p-4">
      <form onSubmit={handleSubmit} className="dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-gray-950 transition-shadow duration-300">
      <h1 className="text-3xl font-bold mb-6 text-amber-700">Create New Post</h1>
        <div className="mb-4">
          <label className="block text-gray-500 text-3xl">Title</label>
          <input
            type="text"
            placeholder='Enter post title'
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-3xl">Content</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder='Write your post content here...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default NewPostPage;