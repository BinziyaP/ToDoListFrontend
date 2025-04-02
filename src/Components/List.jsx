import React, { useState, useEffect } from 'react'
import '../assets/css/List.css'

function List() {
  const [homepages, setHomepages] = useState([]);

  useEffect(() => {
    fetchHomepages();
  }, [homepages]);

  const fetchHomepages = async () => {
    try {
      const response = await fetch('https://todolistbackend-mi08.onrender.com/homepage');
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
         <button className="edit-btn">✏️ </button>
         <button className="delete-btn">🗑️</button>

        </div>
      ))}
    </div>
  )
}

export default List