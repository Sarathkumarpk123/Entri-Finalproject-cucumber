import React, { useContext } from 'react';
import './Cart.css';
import { CartContext } from '../../components/CartContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext); // Access cart and setCart
  console.log("cart details", cart);
  const navigate = useNavigate();

  const handleRemoveFromCart = (foodItem) => {
    setCart(cart.filter(item => item._id !== foodItem._id));
  };

  const handleQuantityChange = (foodItem, newQuantity) => {
    setCart(cart.map(item =>
      item._id === foodItem._id
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceedToCheckout = async () => {
    if (cart.length > 0) {
      try {
        const cartDetails = cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
       
        }));
  
        const total = calculateTotal();
  
        // Send cart data to the backend
        const response = await fetch('https://cucumberr-backend.onrender.com/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ items: cartDetails, totalPrice: total})
        });
  
        if (response.ok) {
          navigate('/order', { state: { cart, total } });
        } else {
          const errorData = await response.json();
          alert(`Checkout failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        alert("An error occurred. Please try again.");
      }
    } else {
      alert('No items in the cart! Redirecting to food selection page.');
      navigate('/all-food'); // Redirect to the food selection page if the cart is empty
    }
  };
  
  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt='' style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}/>
              </p>
              <p>₹{item.price * item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total: ₹{calculateTotal()}</h3>
        </div>
      )}
      {/* Pass cart details to PlaceOrder.jsx when proceeding */}
      <button type="button" onClick={handleProceedToCheckout}>
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
};

export default Cart;
