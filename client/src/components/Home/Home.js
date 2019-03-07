import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './Home.css'
import HomeNavbar from './HomeNavbar';

// Page d'accueil du site avec la navbar
export default class Home extends Component {
  render() {
    return (
      <div style={{position:"relative"}}>
        <HomeNavbar></HomeNavbar>
        <Image src="pictures/home.jpg" className="header-image"/>
        <p style={{position:"absolute", top:'0',fontSize: '16px', fontWeight: '700', fontFamily: 'Helvetica'}}>~~ Photo by Anna Hliamshyna on Unsplash ~~</p>
      </div>
    )
  }
}