import React from 'react';
import './About.css'

const About = () => {
  return (     
      <div className="about-page container">
        <h2 className="h2classname">About Us</h2>
        <p className="h2p">
          Welcome to Foodie Haven, your ultimate destination for delicious meals delivered straight to your door!
        </p>

        <section className="mission-section">
          <h3 className="h3classname">Our Mission</h3>
          <p className="h3p">
            At Foodie Haven, we believe that great food should be accessible to everyone. Our mission is to provide a seamless and enjoyable food ordering experience, bringing you the best local restaurants right at your fingertips.
          </p>
        </section>

        <section className="values-section">
          <h3 className="h3classname">Our Values</h3>
          <ul className="sectionul1">
            <li className="fistsectionli">🌟 Quality: We partner with top-notch restaurants that prioritize quality ingredients and exceptional service.</li>
            <li className="fistsectionli">🤝 Community: Supporting local businesses is at the heart of what we do. We strive to uplift our community with every order.</li>
            <li className="fistsectionli">🚀 Convenience: With just a few clicks, you can order your favorite meals from the comfort of your home or on the go.</li>
            <li className="fistsectionli">💚 Sustainability: We are committed to environmentally friendly practices, including eco-friendly packaging and promoting sustainable dining options.</li>
          </ul>
        </section>

        <section className="features-section">
          <h3 className="h3classname">Why Choose Us?</h3>
          <p className="h3p">
            Here’s what makes Foodie Haven stand out:
          </p>
          <ul className="sectionul1">
            <li className="fistsectionli">🍽️ Extensive Selection: From gourmet dishes to everyday meals, our diverse menu offers something for everyone.</li>
            <li className="fistsectionli">⏰ Fast Delivery: Enjoy quick and reliable delivery service, ensuring your food arrives hot and fresh.</li>
            <li className="fistsectionli">🔒 Secure Ordering: Your safety is our priority. We use secure payment methods and protect your personal information.</li>
          </ul>
        </section>

        <section className="join-us-section ">
          <h3 className="h3classname">Join Our Foodie Community!</h3>
          <p className="h3p">
            Whether you’re a foodie looking for your next meal or a restaurant wanting to reach more customers, we’re here for you. Join us on this delicious journey!
          </p>
          <p className="h3p">
            Start exploring our menu today and experience the joy of ordering food the easy way!
          </p>
        </section>
      </div>
  );
}

export default About;