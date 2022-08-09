import React, { Component } from "react";
import { hot } from "react-hot-loader";

class App extends Component {
  constructor() {
    super();
    this.state = {
      test: 123
    }
  }
  activateLasers = () => {
    let formData = new FormData();
    formData.append("image", this.selected_file);
    fetch("http://localhost:8080", {
      method: "POST",
      header: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.text();
        }
      })
      .then((data) => {
        if (data !== undefined) {
          this.setState({ test: data });
        }
      });
  }
  render() {
    return (
      <>
        <div>初始頁面</div>
        <button onClick={this.activateLasers}>start</button>
        <input type="file" onChange={(e) => { this.selected_file = e.target.files[0] }}></input>
        <div>{this.state.test}</div>
      </>
    );
  }
}
export default hot(module)(App);
