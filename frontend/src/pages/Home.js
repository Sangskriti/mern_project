import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [stories, setStories] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchStories = async () => {
    const res = await axios.get('http://localhost:5000/api/stories');
    setStories(res.data);
  };

  const toggleBookmark = async (id) => {
    if (!token) return alert("Please login first!");
    await axios.post(`http://localhost:5000/api/stories/${id}/bookmark`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchStories();
  };

  useEffect(() => { fetchStories(); }, []);

  return (
    <div>
      <h1>Top Hacker News</h1>
      {stories.map(story => (
        <div key={story._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3><a href={story.url} target="_blank"rel="noreferrer">{story.title}</a></h3>
          <p>{story.points} points | Author: {story.author}</p>
          <button onClick={() => toggleBookmark(story._id)}>Bookmark</button>
        </div>
      ))}
    </div>
  );
};

export default Home;