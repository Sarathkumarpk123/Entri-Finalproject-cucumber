import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreRestaurent from '../../components/ExploreRestaurent/ExploreRestaurent';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  // Fetching restaurant data from API
  useEffect(() => {
    fetch('https://entri-final-project-cucumber-backend.onrender.com/restaurents')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const handleRestaurantClick = async (name, category, index) => {
    if (index >= 10) { 
      toast.error('No food items added'); 
      return; 
    }

    let foodApiUrl = '';

    if (index === 4) {
      foodApiUrl = 'https://entri-final-project-cucumber-backend.onrender.com/foods?vegOnly=false';
    } else if (index === 5) {
      foodApiUrl = 'https://back-project-3gug.onrender.com/foodrest1?vegOnly=false';
    } 

    navigate('/all-food', {
      state: { restaurantName: name, restaurantCategory: category, index, foodApiUrl }
    });
  };

  return (
    <div>
      <Header />
      <ExploreRestaurent />
      <div className='restaurant-list'>
        {restaurants.map((restaurant, index) => (
          <article
            key={restaurant._id}
            className='restaurant'
            onClick={() => handleRestaurantClick(restaurant.name, restaurant.category, index)}
          >
            <img src={restaurant.image} alt={restaurant.name} className='restaurant-image' />
            <div className='restaurant-details'>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.description}</p>
              <p><strong>Place:</strong> {restaurant.place}</p>
              <p><strong>Category:</strong> {restaurant.category}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
