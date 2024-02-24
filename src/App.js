import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  // Fetch JSON data from the provided URL
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data.map(user => ({ ...user, followed: false })));
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
  }, []);

  // Function to handle user deletion
  const deleteUser = id => {
    const newUsers = users.filter(user => user.id !== id);
    setUsers(newUsers);
  };

  // Function to handle following a user
  const toggleFollow = id => {
    const newUsers = users.map(user =>
      user.id === id ? { ...user, followed: !user.followed } : user
    );
    setUsers(newUsers);
  };

  return (
    <div>
      <div className="user-list">
        {users.map(user => (
          <div className="user" key={user.id}>
            <div className="icon-circle">
              <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="User Icon" />
            </div>
            <h2>{user.name} {user.followed && <span>&#9733;</span>}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <div>
            <button className='follow' onClick={() => toggleFollow(user.id)}>
              {user.followed ? 'unfollow' : 'Follow'}
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
