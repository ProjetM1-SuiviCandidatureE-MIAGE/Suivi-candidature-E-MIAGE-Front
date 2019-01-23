import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './Home.css'
import HomeNavbar from './HomeNavbar';

// Page d'accueil du site avec la navbar
export default class Home extends Component {
  render() {
    return (
      <div>
        <HomeNavbar></HomeNavbar>
        <Image src="pictures/home.jpg" className="header-image"></Image>
        ~~ Photo by Anna Hliamshyna on Unsplash ~~
      </div>
    )
  }
}