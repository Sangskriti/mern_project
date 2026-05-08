import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Bookmarks = () => {
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchBookmarks = async () => {
      try {
        
        const res = await axios.get('https://mern-project-q04m.onrender.com/api/stories/saved', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        
        setBookmarkedStories(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [token, navigate]);

  if (loading) return <p>Loading your bookmarks...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Bookmarks</h2>
      {bookmarkedStories.length === 0 ? (
        <p>No bookmarks found. Start saving some stories!</p>
      ) : (
        bookmarkedStories.map(story => (
          <div key={story._id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <a href={story.url} target="_blank" rel="noreferrer">
              <h3 style={{ margin: '0' }}>{story.title}</h3>
            </a>
            <p>Author: {story.author} | Points: {story.points}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookmarks;