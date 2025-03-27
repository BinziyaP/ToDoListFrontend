import React,{useState} from 'react'
import '../assets/css/Home.css'
import axios from 'axios'


function Home() {

  const [property, setProperty] = useState({
    title: ""
  });
  
  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:5000/homepage", property);
        alert("Property added successfully!");
    } catch (error) {
        console.error("Error adding property:", error);
        alert("Failed to add property.");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>TO DO LIST</h2> 
        <input type="text" name='title' placeholder="Enter text here" value={property.title} onChange={handleChange}></input>
        <button type='Submit'>Insert</button>
        </form>
    </div>
  )
}

export default Home