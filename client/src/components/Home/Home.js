import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "./Home.css";
import HomeNavbar from "./HomeNavbar/HomeNavbar";
import { withRouter } from "react-router-dom";

// Page d'accueil du site avec la navbar
class Home extends Component {
  render() {
    return (
      <div style={{ position: "relative" }}>
        <HomeNavbar props={this.props} />
        <Image src="pictures/home.png" className="header-image" />
      </div>
    );
  }
}
export default withRouter(Home);
