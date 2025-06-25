import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  // Fetch items from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  // Add new item
  const addItem = () => {
    axios.post('http://localhost:5000/api/items', { name })
      .then(response => {
        setItems([...items, response.data]);
        setName('');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Simple MERN Example</h1>
      
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter item name" 
        />
      </div>
      
      <button className="btn btn-primary" onClick={addItem}>Add Item</button>

      <h2 className="mt-4">Items:</h2>
      <ul className="list-group">
        {items.map(item => (
          <li key={item._id} className="list-group-item">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
