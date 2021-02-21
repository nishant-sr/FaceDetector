import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png';
import './Logo.css';

const Logo = () => {
  return(
    <div className="ma4 mt0">
      <Tilt className="Tilt br-2 shadow-2" options={{max:25}} style={{height:100,width:100}}>
        <div className = 'Tilt-inne pa3r'>
          <img style={{paddingTop: '5px'}} alt='logo' src={logo}/>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo
