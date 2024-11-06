import React, { useEffect, useState } from 'react';
import './Userprofile.css';
import { useNavigate } from 'react-router-dom';
import albert from '../../assets/albert.png';
import rosalite from '../../assets/rosalite.png';
import newton from '../../assets/newton.png';
import poppers from '../../assets/poppers.png';

const UserProfile = ({ role }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const navigate = useNavigate();
  const profileImages = [albert, rosalite, newton];

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');

    if (storedName && storedEmail) {
      setName(storedName);
      setEmail(storedEmail);
      setShowCongrats(true);
      setTimeout(() => {
        setShowCongrats(false);
        setShowCelebration(true);
        setTimeout(() => {
          setShowCelebration(false);
        }, 3000);
      }, 1000);
    }

    const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
    setUserImage(randomImage);
  }, []);

  const handleSave = () => {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to animate each letter of the welcome message
  const renderWelcomeMessage = (name) => {
    return name.split('').map((letter, index) => (
      <span key={index} className="animated-letter" style={{ animationDelay: `${index * 0.1}s` }}>
        {letter}
      </span>
    ));
  };

  // Function to handle User Order navigation
  const handleUserOrderClick = () => {
    navigate('/userorder');
  };

  return (
    <div className="usersection">
      {showCongrats && (
        <div className="congrats-screen">
          <h2>Congratulations, {name}!</h2>
          <p>🎉 You've successfully logged in! 🎉</p>
          <div className="congrats-effects">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="confetti"></div>
            ))}
          </div>
        </div>
      )}

      {!showCongrats && (
        <>
          <h2>
            Welcome, {name ? renderWelcomeMessage(name) : 'Guest'}
            {showCelebration && <span className="celebration"> 🎉✨</span>}
          </h2>
          {role === 'admin' ? (
            <p>👋 Hi Admin, long time no see!</p>
          ) : (
            ''
          )}
          {role === "user" ?  <div className="user-details">
         
         {isEditing ? (
           <div className="edit-form">
             <label>
               Name:
               <input
                 type="text"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder="Enter name"
               />
             </label>
            
             <button className="save-button" onClick={handleSave}>
               Save
             </button>
           </div>
         ) : (
           <div className="view-form">
             <img src={userImage} alt="User Profile" className="user-profile-img" />
             <p>Name: {name ? name : 'User'}</p>
             <hr />
             <p>Email: {email ? email : 'email@example.com'}</p>
             <button className="edit-button" onClick={handleEdit}>
               Edit Profile
             </button>
             <button className="user-order-button" onClick={handleUserOrderClick}>
               User Order
             </button>
           </div>
         )}
       </div>: ""}
         

          {showCelebration && (
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div key={i} className="confetti"></div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;
