import React from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import petango from '../../assets/petango.jpg';
import './header.css';


const Header = () => (
  
 
  <div className="gpt3__header section__padding" id="home">
    
    <div className="gpt3__header-content">
      <h1 className="gradient__text1">Pets Town</h1>
      <h1 className="gradient__text1">Adorable adoptables near you!</h1>
      <p>Browse pets from our network of over 11,500 shelters and rescues</p>
{/* 
      <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div> */}

      <div className="gpt3__header-content__people">
        <img src={people} />
        <p>1,600 visitors in the last 24 hours</p>
      </div>
    </div>

    <div className="gpt3__header-image">
      <img src={petango} />
    </div>
  </div>
);

export default Header;
