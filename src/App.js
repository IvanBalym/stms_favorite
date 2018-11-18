import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RouterContainer from "./Router";
import Menu from "./components/Menu/index.js";

class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Menu />
            <RouterContainer />
          </div>
        </Router>
    );
  }
}

export default App;
