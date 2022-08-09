import React, { Component } from "react";
import { hot } from "react-hot-loader";
import { Link } from "react-router-dom";
import logoImage from "./images/logo.svg";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="title">
          <Link to="/">
            <img alt={"logo"} src={logoImage} />
          </Link>
          <Link to="/">
            <div className="text">
              <span>國立暨南國際大學資訊工程系</span>
              <span>人工智慧創新應用實驗室</span>
            </div>
          </Link>          
        </div>
        <h1>口腔影像辨識平台</h1>
      </div>
    );
  }
}

export default hot(module)(Header);
