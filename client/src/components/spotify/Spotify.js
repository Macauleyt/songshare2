import React, { Component } from "react";
import "../../App.css";
import { connect } from "react-redux";

import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class Spotify extends Component {
  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888"> Login to Spotify </a>
      </div>
    );
  }
}

export default connect()(Spotify);
