// src/pages/PostDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch post details
        const postResponse = await fetch(`http://localhost:5020/api/posts/${id}`);
        const postData = await postResponse.json();
        setPost(postData);
        setTitle(postData.title);
        setContent(postData.content);

        // Fetch comments for the post
        const commentsResponse = await fetch(`http://localhost:5020/api/comments/${id}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('You must be logged in to delete a post.');

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`http://localhost:5020/api/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          navigate('/home');
        } else {
          alert('Failed to delete post or unauthorized.');
        }
      } catch (error) {
        console.error('Deletion error:', error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('You must be logged in to update a post.');

    try {
      const response = await fetch(`http://localhost:5020/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await response.json();
      if (response.ok) {
        setPost(data);
        setIsEditing(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to comment.');
      return;
    }
    if (newCommentContent.trim() === '') {
      alert('Comment cannot be empty.');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5020/api/comments/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newCommentContent }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data && data.author) {
          setComments([...comments, data]);
          setNewCommentContent('');
        } else {
          console.error('Server response is missing author data:', data);
          alert('Failed to submit comment due to a server error.');
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Comment submission error:', error);
      alert('Failed to submit comment.');
    }
  };

  if (!post) return <div className="text-center mt-8">Loading...</div>;

  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const isAuthor = loggedInUser && post.author && loggedInUser.id === post.author._id;

  return (
    <div className="mt-3 container max-w-6xl mx-auto p-4  flex flex-col md:flex-row gap-8">
      {/* Post Content Section - Now with fixed height and scrolling */}
      <div className="w-full md:w-1/2 p-6 rounded-lg shadow-md dark:bg-gray-900 hover:shadow-gray-950 transition-shadow duration-300 h-[600px] overflow-y-auto">
        {isEditing ? (
          <form onSubmit={handleUpdate}>
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            <div className="mb-4">
              <label className="block text-white">Title</label>
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white">Content</label>
              <textarea
                className="w-full mt-2 p-2 border rounded-lg h-48"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mr-2">
              Save Changes
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-2 text-amber-100">{post.title}</h1>
            <p className="text-sm text-white mb-4">By: {post.author.firstname} {post.author.lastname}</p>
            <p className="text-lg text-white leading-relaxed whitespace-pre-wrap">{post.content}</p>

            {isAuthor && (
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Comment Section */}
      <div className="w-full md:w-1/2 h-[250px] overflow-y-auto dark:bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-gray-950 transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-white mb-4">Comments ({comments.length})</h2>
        
        {/* New Comment Form */}
        <form onSubmit={handleNewCommentSubmit} className="mb-8">
          <textarea
            className="w-full p-3 border rounded-lg dark:bg-gray-800 text-white"
            rows="4"
            placeholder="Write a comment..."
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          ></textarea>
          <button type="submit" className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
            Submit Comment
          </button>
        </form>

        {/* List of Comments */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="dark:bg-gray-800 p-4 rounded-lg shadow">
              <p className="text-sm font-semibold text-white">
                {comment.author.firstname} {comment.author.lastname}
              </p>
              <p className="text-gray-300 mt-1">{comment.content}</p>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;