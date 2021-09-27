import React from "react";
import "../styles/app.scss";
// import Canvas from "./Canvas";
import AudioAnalyser from "./AudioAnalyser";
import Search from "./Search";
// import SpotifyPlayer from "./SpoitfyPlayer";
// import Login from "./Login";
import { connect } from "react-redux";
import { getToken } from "../actions";

const App = ({ getToken }) => {
  // useEffect(() => {
  //   getToken();
  // }, [getToken]);

  return (
    <div id="app">
      {/* <Login /> */}
      {/* <Canvas /> */}
      <AudioAnalyser />
      <Search />
      {/* <SpotifyPlayer /> */}
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getToken })(App);
