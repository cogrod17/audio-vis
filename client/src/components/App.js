import React, { Component } from "react";
import "../styles/app.scss";
import AudioAnalyser from "./AudioAnalyser";
import Buttons from "./Buttons";

class App extends Component {
  state = { vis: 1 };

  setVis = (num) => {
    if (num === this.state.vis) return;
    this.setState({ vis: +num });
  };

  render() {
    return (
      <div id="app">
        <Buttons setVis={this.setVis} />
        <AudioAnalyser vis={this.state.vis} />
      </div>
    );
  }
}

export default App;
