import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import './Home.css'
import HomeNavbar from './HomeNavbar';

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