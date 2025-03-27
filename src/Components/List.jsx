import React, { useState, useEffect } from 'react'
import '../assets/css/List.css'

function List() {
  const [homepages, setHomepages] = useState([]);

  useEffect(() => {
    fetchHomepages();
  }, [homepages]);

  const fetchHomepages = async () => {
    try {
      const response = await fetch('http://localhost:5000/homepage');
      const data = await response.json();
      setHomepages(data);
    } catch (err) {
      console.error('Error fetching homepages:', err);
    }
  };

  return (
    <div>
      {homepages.map(homepage => (
        <div key={homepage._id}>
          <input 
            type="text" 
            value={homepage.title} 
            disabled
          />
          <button className="edit-btn">Edit</button>
          <button className="close-btn">Close</button>
        </div>
      ))}
    </div>
  )
}

export default List