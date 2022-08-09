import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader";
import "./App.css";
import Header from "./Header";
import Login from "./Login";
import Oral from "./Oral";
import Footer from "./Footer";
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/">
            <Header />
          </Route>
          <Switch>
            <Route exact path="/"
              render={(props)=><Login {...props} />}
            />
            <Route
              exact path="/oral"
              render={(props)=><Oral {...props} />}
            />
            {/* <Route
              path="/:type/dataset"
              render={(props) => <Dataset {...props} />}
            />
            <Route
              exact
              path="/:type"
              render={(props) => <ContentProjectList {...props} />}
            />
            <Route
              exact
              path="/:type/:name"
              render={(props) => <Project {...props} />}
            /> */}
          </Switch>
          <Footer></Footer>
        </div>
      </BrowserRouter >
    );
  }
}

export default hot(module)(App);
