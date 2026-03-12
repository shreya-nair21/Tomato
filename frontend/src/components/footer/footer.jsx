import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={assets.logo} alt="" />
          <p>Your Favorite Food Delivery Service</p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt=""/>
            <img src={assets.twitter_icon} alt=""/>
            <img src={assets.linkedin_icon} alt=""/>

          </div>
        </div>

        <div className='footer-content-center'>
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='footer-content-right'></div>
          <h2>Get In Touch</h2>
          <ul>
            <li>+1-212-763-3838</li>
            <li>contact@Tomato.com</li>
          </ul>

      </div>
      <hr />
      <p className='footer-copyright'>© 2026 Tomato. All rights reserved.</p>
    </div>
  )
}

export default Footer