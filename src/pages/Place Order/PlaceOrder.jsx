import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../components/CartContext';
import './PlaceOrder.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const PlaceOrder = () => {
  const { userId } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || {};

  // Load initial form data from localStorage if it exists, otherwise use default values
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('deliveryFormData');
    return savedData ? JSON.parse(savedData) : {
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phoneNumber: ''
    };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      localStorage.setItem('deliveryFormData', JSON.stringify(updatedData)); // Save to localStorage
      return updatedData;
    });
  };

  const handleProceedToPayment = () => {
    if (cart && cart.length > 0) {
      navigate('/payment', { state: { cart, total } });
    } else {
      toast.error('No items in the cart!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Delivery details submitted!');
    // Optionally clear localStorage after submission
    // localStorage.removeItem('deliveryFormData');
  };

  return (
    <div className='place-order'>
      <div className='place-order-left'>
        <form onSubmit={handleSubmit}>
          <h2 className='title'>Delivery Information</h2>
          <input
            type='text'
            placeholder='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <input
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type='text'
            placeholder='Street'
            name='street'
            value={formData.street}
            onChange={handleInputChange}
          />
          <input
            type='text'
            placeholder='City'
            name='city'
            value={formData.city}
            onChange={handleInputChange}
          />
          <input
            type='text'
            placeholder='State'
            name='state'
            value={formData.state}
            onChange={handleInputChange}
          />
          <input
            type='text'
            placeholder='Zip-Code'
            name='zipCode'
            value={formData.zipCode}
            onChange={handleInputChange}
          />
          <input
            type='text'
            placeholder='Country'
            name='country'
            value={formData.country}
            onChange={handleInputChange}
          />
          <input
            type='text'
            placeholder='Phone Number'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <button type="submit">SUBMIT DETAILS</button>
        </form>
      </div>

      <div className='place-order-right'>
        <h2>Order Summary</h2>
        <div className='cart-summary'>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index}>
                <p>{item.name} x {item.quantity}</p>
                <p>₹{item.price * item.quantity}</p>
              </div>
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
        {cart && cart.length > 0 && (
          <h3>Total: ₹{total}</h3>
        )}
        <button type="button" onClick={handleProceedToPayment}>
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
