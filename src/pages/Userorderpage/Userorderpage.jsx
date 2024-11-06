import React, { useEffect, useState } from 'react';
import './Userorderpage.css';

const Userorderpage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('https://cucumberr-backend.onrender.com/carts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched orders:', data); // Log the full response
        setOrders(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // Function to remove all items from an order
  const removeAllItems = (orderId) => {
    if (window.confirm('Are you sure you want to remove all items from this order?')) {
      const token = localStorage.getItem('token');

      fetch(`https://cucumberr-backend.onrender.com/carts/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to remove items');
          }
          // Update orders to remove the entire order locally
          setOrders((prevOrders) => 
            prevOrders.filter(order => order._id !== orderId)
          );
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  };

  return (
    <div className="user-order-container">
    <div className="user-order-pages">
      <h2>User Orders</h2>
      {error && <p className="errors">{error}</p>}
      {orders.length === 0 && !error ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, index) => (
          <article key={index} className="order-itemm">
            <h3>Orders{order.restaurant}</h3>
            {Array.isArray(order.items) && order.items.length > 0 ? (
              <>
                {order.items.map((item) => (
                  <article key={item._id} className="food-itemm">
                    <img 
                      src={item.image || 'default-image.png'} // Make sure to use an actual image source
                      alt={item.name || 'Food Item'} 
                      className="food-item-imagee" 
                    />
                    <div className="food-item-detailss">
                      <h4>{item.name}</h4>
                      
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </article>
                ))}
                {/* Remove all items button for the entire order */}
                <button onClick={() => removeAllItems(order._id)} className="remove-all-items-buttonn">
                  Remove All Items
                </button>
              </>
            ) : (
              <p>No items found in this order</p>
            )}
          </article>
        ))
      )}
    </div>
    </div>
  );
};

export default Userorderpage; 
