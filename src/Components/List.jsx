import React, { useState, useEffect } from 'react'
import '../assets/css/List.css'
import axios from 'axios'

function List() {
  const [homepages, setHomepages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    fetchHomepages();
  }, []);

  const fetchHomepages = async () => {
    try {
      const response = await axios.get('https://todolistbackend-mi08.onrender.com/homepage');
      setHomepages(response.data);
    } catch (err) {
      console.error('Error fetching homepages:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://todolistbackend-mi08.onrender.com/homepage/${id}`);
      if (response.data.message === 'Deleted Homepage') {
        alert('Item deleted successfully!');
        fetchHomepages(); // Refresh the list after deletion
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Failed to delete item. Please try again.');
    }
  };

  const handleEdit = (homepage) => {
    setEditingId(homepage._id);
    setEditText(homepage.title);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`https://todolistbackend-mi08.onrender.com/homepage/${id}`, {
        title: editText
      });
      alert('Item updated successfully!');
      setEditingId(null);
      fetchHomepages(); // Refresh the list after update
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Failed to update item.');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="list-container">
      {homepages.map(homepage => (
        <div key={homepage._id} className="list-item">
          {editingId === homepage._id ? (
            <>
              <input 
                type="text" 
                value={editText} 
                onChange={(e) => setEditText(e.target.value)}
              />
              <button className="save-btn" onClick={() => handleUpdate(homepage._id)}>💾</button>
              <button className="cancel-btn" onClick={handleCancel}>❌</button>
            </>
          ) : (
            <>
              <input 
                type="text" 
                value={homepage.title} 
                disabled
              />
              <button className="edit-btn" onClick={() => handleEdit(homepage)}>✏️</button>
              <button className="delete-btn" onClick={() => handleDelete(homepage._id)}>🗑️</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default List