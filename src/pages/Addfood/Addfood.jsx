import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Addfood.css';
import { toast } from 'react-hot-toast';

export const Addfood = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    isVeg: true,
    restaurantId: '',
  });

  useEffect(() => {
    // Fetch the restaurants on component mount
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('https://cucumberr-backend.onrender.com/restaurents');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        toast.error(`Error fetching restaurants: ${error.message}`);
      }
    };

    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVegChange = (e) => {
    setFormData({
      ...formData,
      isVeg: e.target.value === 'true',
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.image) {
      toast.error("Please select an image.");
      return;
    }
  
    // Find the selected restaurant based on the restaurantId
    const selectedRestaurant = restaurants.find(
      (restaurant) => restaurant._id === formData.restaurantId
    );
  
    // Check if the selected restaurant's category is "veg" and food is "non-veg"
    if (selectedRestaurant && selectedRestaurant.category === "veg" && !formData.isVeg) {
      toast.error("Food can't be added, invalid category.");
      return;
    }
  
    const formDataToSend = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image: formData.image,
      category: formData.category,
      isVeg: formData.isVeg,
      restaurantId: formData.restaurantId,
    };
  
    try {
      const response = await fetch('https://back-project-3gug.onrender.com/foodrest1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const newFood = await response.json();
      toast.success('Food added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        isVeg: true,
        restaurantId: '',
      });
  
      navigate('/');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };
  


  return (
    <div className="add-food-container">
      <h2>Add New Food</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Food Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Is Vegetarian?</label>
          <div>
            <label>
              <input
                type="radio"
                name="isVeg"
                value="true"
                checked={formData.isVeg === true}
                onChange={handleVegChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isVeg"
                value="false"
                checked={formData.isVeg === false}
                onChange={handleVegChange}
              />
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="restaurantId">Restaurant</label>
          <select
            id="restaurantId"
            name="restaurantId"
            value={formData.restaurantId}
            onChange={handleChange}
            required
          >
            <option value="">Select a restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default Addfood;
