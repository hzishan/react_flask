import React, { Component } from "react";
import { hot } from "react-hot-loader";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>隱私權保護 | 資訊安全 | 著作權聲明</p>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <p>國立暨南國際大學</p>
          <p>資訊工程系</p>
          <p>人工智慧創新應用實驗室&ensp;</p>
          <p>版權所有</p>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <p>Copyright © 2021 NCNU&ensp;</p>
          <p>Artificial Intelligence Innovation & Application Labortory&ensp;</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    );
  }
}

export default hot(module)(Footer);
