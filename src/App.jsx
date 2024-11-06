import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/Place Order/PlaceOrder';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Menu from './pages/Menu/Menu';
import Allfood from './components/Allfood/Allfood';
import Payment from './components/Payment/Payment';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';



import Addfood from './pages/Addfood/Addfood';
import './App.css';


import UserProfile from './pages/Userprofile/Userprofile';
import Addrest from './pages/AddRestaurant/Addrest';
import Userorderpage from './pages/Userorderpage/Userorderpage';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) {
      fetch('https://cucumber-backend-main.onrender.com/checkRole/checkRole', { 
        method: "GET",
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setRole(data.role);
          localStorage.setItem("role", data.role);
        } else {
          console.error("Failed to fetch role:", data.message);
        }
      })
      .catch(err => console.error("Error fetching role:", err));
    }
  }, [token]);

  return (
    <>
      <Toaster />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} setToken={setToken} role={role} />}

      <div className='headpart'>
        <Navbar 
          setShowLogin={setShowLogin} 
          token={token} 
          setToken={setToken} 
          cart={cart} 
          setCart={setCart} 
          role={role}
        />

        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/all-food' element={<Allfood cart={cart} setCart={setCart} />} />

          {/* Protected Routes */}
          <Route 
            path='/cart' 
            element={
              <ProtectedRoute token={token}>
                <Cart cart={cart} setCart={setCart} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/order' 
            element={
              <ProtectedRoute token={token}>
                <PlaceOrder />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/payment' 
            element={
              <ProtectedRoute token={token}>
                <Payment />
              </ProtectedRoute>
            } 
          />
         
          <Route 
            path='/userprofile' 
            element={
              <ProtectedRoute token={token}>
                <UserProfile role={role} />
              </ProtectedRoute>
            } 
          />
           <Route 
            path='/userorder' 
            element={
              <ProtectedRoute token={token}>
                <Userorderpage role={role} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/addfoodpage' 
            element={
              <ProtectedRoute token={token}>
                <Addfood />
              </ProtectedRoute>
            } 
          />
           <Route 
            path='/addrest' 
            element={
              <ProtectedRoute token={token}>
                <Addrest />
              </ProtectedRoute>
            } 
          />

          {/* Admin Protected Route */}
          {role === "admin" && (
            <Route 
              path='/dashboard' 
              element={
                <ProtectedRoute token={token}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          )}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;