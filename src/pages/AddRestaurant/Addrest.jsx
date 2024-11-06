import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Addrest.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Addrest = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    place: '',
    image: '', // This will store the Base64 image
    category: 'veg', // Default category
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  // Function to handle image upload and convert it to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    const reader = new FileReader();
    reader.onloadend = () => {
      setRestaurant({ ...restaurant, image: reader.result }); // Base64 string is stored in `image`
    };
    if (file) {
      reader.readAsDataURL(file); // Convert the image to Base64
    }
  };

  // Function to submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      name: restaurant.name,
      description: restaurant.description,
      place: restaurant.place,
      image: restaurant.image, // Base64 encoded image
      category: restaurant.category,
    };

    try {
      const response = await fetch('https://back-project-3gug.onrender.com/restaurents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the restaurant data in JSON format
      });

      if (response.ok) {
        toast.success('Restaurant added successfully!', {
          position: 'top-right', // Fixed toast position
        });
        const result = await response.json();
        console.log('Restaurant added successfully:', result);
        
        // Optionally, reset the form
        setRestaurant({
          name: '',
          description: '',
          place: '',
          image: '',
          category: 'veg',
        });

        // Navigate to the home page after successful addition
        navigate('/');
      } else {
        toast.error('Failed to add restaurant!', {
          position: 'top-right', // Fixed toast position
        });
        console.error('Failed to add restaurant');
      }
    } catch (error) {
      toast.error('Error adding restaurant!', {
        position: 'top-right', // Fixed toast position
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-rest-container">
      <h2>Add Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Restaurant Name:
          <input
            type="text"
            name="name"
            value={restaurant.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={restaurant.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Place:
          <input
            type="text"
            name="place"
            value={restaurant.place}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload} // Handle the image upload
            required
          />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={restaurant.category}
            onChange={handleChange}
            required
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </label>
        <button type="submit">Add Restaurant</button>
      </form>

      {/* Toast Container to show messages */}
      <ToastContainer />

      {/* Display the uploaded image */}
      {restaurant.image && (
        <div>
          <h3>Uploaded Image Preview:</h3>
          <img
            src={restaurant.image}
            alt="Restaurant Preview"
            style={{ width: '200px', height: '200px' }}
          />
        </div>
      )}
    </div>
  );
};

export default Addrest;
