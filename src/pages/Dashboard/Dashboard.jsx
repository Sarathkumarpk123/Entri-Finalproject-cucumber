import React, { useEffect, useState } from 'react';
import'./Dashboard.css'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://cucumber-backend-main.onrender.com/usersignup');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data); // Assuming the response is an array of users
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const removeUser = async (userId) => {
    try {
      const response = await fetch(`https://cucumber-backend-main.onrender.com/usersignup/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the user');
      }
      // Update state to remove the user from the list
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      setError('Error deleting user');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

 const handleProceedtoAddfood=()=>{
  navigate('/addfoodpage')
 }
 const handleProceedtoAddrest=()=>{
  navigate('/addrest')
 }

  return (
    <div>
      <h1>Dashboard</h1>
      <article className='user article'>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Mobile: {user.mobile}</p>
              {/* Remove User Button */}
              <button onClick={() => removeUser(user._id)}>Remove User</button>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
        <button className='add-food-button' onClick={handleProceedtoAddfood}>Add Food</button>
        <button className='add-rest-button' onClick={handleProceedtoAddrest}>Add Restaurant</button>
      </article>
    </div>
  );
};

export default Dashboard;
