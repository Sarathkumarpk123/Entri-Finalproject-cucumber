import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Allfood.css';
import { CartContext } from '../CartContext';
import { toast } from 'react-hot-toast';

export const Allfood = () => {
  const { cart, setCart } = useContext(CartContext);
  const [foodItems, setFoodItems] = useState([]);
  const [sortedFoodItems, setSortedFoodItems] = useState([]); // To store sorted items
  const [sortMethod, setSortMethod] = useState('latest'); // Default sorting
  const location = useLocation();
  const { restaurantName, restaurantCategory, index, query } = location.state || {}; // Access search query here
  const navigate = useNavigate();

  useEffect(() => {
    let foodApiUrl = '';

    // Conditionally set the API URL based on the restaurant index
    if (index === 0 || index === 1) {
      foodApiUrl = restaurantCategory === "veg"
        ? 'https://entri-final-project-cucumber-backend.onrender.com/foods?vegOnly=true'
        : 'https://entri-final-project-cucumber-backend.onrender.com/foods?vegOnly=false';
    } else if (index === 2 || index === 3) {
      
      foodApiUrl = restaurantCategory === "veg"
        ? 'https://back-project-3gug.onrender.com/foodrest1?vegOnly=true'
        : 'https://back-project-3gug.onrender.com/foodrest1?vegOnly=false';
    }
    else if (index === 4) {
      foodApiUrl = 'https://entri-final-project-cucumber-backend.onrender.com/foods?vegOnly=false';
    } else if (index === 5) {
      foodApiUrl = 'https://back-project-3gug.onrender.com/foodrest1?vegOnly=false';
    }
    else if (index === 6 || index === 7) {
      foodApiUrl = restaurantCategory === "non-veg"
     ?'https://back-project-3gug.onrender.com/foodrest1?vegOnly=false'
     :'https://back-project-3gug.onrender.com/foodrest1?vegOnly=true';
   }
    
    // Fetch the food data based on the API URL
    fetch(foodApiUrl)
      .then(response => response.json())
      .then(data => setFoodItems(data))
      .catch(error => console.error('Error fetching food:', error));
  }, [restaurantCategory, index]);

  // Filter the food items based on the search query
  useEffect(() => {
    let filteredItems = foodItems;

    // If there's a search query, filter the food items
    if (query) {
      filteredItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Handle sorting whenever foodItems or sortMethod changes
    let sortedItems = [...filteredItems];

    if (sortMethod === 'name') {
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMethod === 'price') {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (sortMethod === 'latest') {
      sortedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setSortedFoodItems(sortedItems);
  }, [foodItems, sortMethod, query]);

  // Function to handle Add to Cart logic
  const handleAddToCart = async (foodItem) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('name');
    if (!token) {
      toast.error('Please login to add items to the cart.');
      navigate('/login');
      return;
    }

    const existingItem = cart.find(item => item._id === foodItem._id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map(item =>
        item._id === foodItem._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...foodItem, quantity: 1 }];
    }

    setCart(updatedCart);
    toast.success(`${foodItem.name} has been added to your cart!`);

    // Send the cart item to the API
    const cartItem = {
      foodId: foodItem._id,
      name: foodItem.name,
      price: foodItem.price,
      quantity: existingItem ? existingItem.quantity + 1 : 1,
      image: foodItem.image,
      username: username,
    };

    try {
      const response = await fetch('https://backend-cucumber-final.onrender.com/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Item successfully added to cart in MongoDB:', result);
      } else {
        console.error('Failed to add item to cart in MongoDB:', response.statusText);
        toast.error('Failed to add item to the cart in the database.');
      }
    } catch (error) {
      console.error('Error adding item to cart in MongoDB:', error);
      toast.error('An error occurred while adding item to the cart in the database.');
    }
  };

  return (
    <div>
      <h1>{restaurantCategory === "veg" ? "Veg Food" : "Non-Veg Food"}</h1>
      {restaurantName ? <h2>Restaurant: {restaurantName}</h2> : <p>Results for "{query}"</p>}

      {/* Sorting Dropdown */}
      <div className="sorting">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
          <option value="latest">Latest Added</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="food-list">
        {sortedFoodItems.length > 0 ? (
          sortedFoodItems.map((food) => (
            <div key={food._id} className="food-item">
              <img src={food.image} alt={food.name} className="food-image" />
              <div className="food-details">
                <h3>{food.name}</h3>
                <p>{food.description}</p>
                <p><strong>Price:</strong> ₹{food.price}</p>
                <button onClick={() => handleAddToCart(food)}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default Allfood;
