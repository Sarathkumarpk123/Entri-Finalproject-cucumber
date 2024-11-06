import React, { useEffect, useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('newlyAdded'); // Default sorting

  // Fetching food data from API
  useEffect(() => {
    fetch('https://entri-final-project-cucumber-backend.onrender.com/foods')
      .then(response => response.json())
      .then(data => setFoods(data))
      .catch(error => console.error('Error fetching food items:', error));
  }, []);

  // Function to sort foods based on the selected criteria
  const sortFoods = (foods) => {
    switch (sortCriteria) {
      case 'newlyAdded':
        return foods.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); // Assuming `dateAdded` is in the food object
      case 'price':
        return foods.sort((a, b) => a.price - b.price);
      case 'date':
        return foods.sort((a, b) => new Date(b.date) - new Date(a.date)); // Assuming `date` is in the food object
      default:
        return foods;
    }
  };

  // Sort the foods based on the selected criteria
  const sortedFoods = sortFoods([...foods]); // Spread operator to create a copy before sorting

  return (
    <div>
      <h1>Explore Our Top Menus</h1>

      {/* Sort Selection */}
      <div className='sort-options'>
        <label htmlFor='sort'>Sort by:</label>
        <select
          id='sort'
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value='newlyAdded'>Newly Added</option>
          <option value='price'>Price</option>
          <option value='date'>Date</option>
        </select>
      </div>

      <div className='food-list'>
        {sortedFoods.map(food => (
          <article key={food._id} className='topfoods'>
            <img src={food.image} alt={food.name} className='food-image' />
            <div className='food-details'>
              <h2>{food.name}</h2>
              <p>{food.description}</p>
              <p><strong>Price:</strong> {food.price}</p>
              <p><strong>Category:</strong> {food.category}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Menu;
