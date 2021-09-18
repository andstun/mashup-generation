import './App.css';
import axios from 'axios';
import React, { Component } from 'react';

class App extends Component {

  state = {
    // Initially, no file is selected
    song1: null,
    song2: null
  };

  // On file select (from the pop up)
  onSong1Change = event => {
    // Update the state
    console.log(event.target.files[0]);

    this.setState({
      song1: event.target.files[0]
    });
    console.log(this.state.song1);
  };

  // On file select (from the pop up)
  onSong2Change = event => {
    // Update the state
    this.setState({
      song2: event.target.files[0]
    });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    formData.append(
      "myFile",
      this.state.song1,
      this.state.song1.name
    );

    // Details of the uploaded file
    console.log(this.state.song1);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {

    if (this.state.song1 && this.state.song2) {

      return (
        <div>
          <h2>File 1 Details:</h2>

          <p>File 1 Name: {this.state.song1.name}</p>

          <p>File 1 Type: {this.state.song1.type}</p>

          <h2>File 2 Details:</h2>

          <p>File 2 Name: {this.state.song2.name}</p>

          <p>File 2 Type: {this.state.song2.type}</p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {

    return (
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <input type="file" onChange={this.onSong1Change} />
          </div>
          <div class="col-md-6">
            <input type="file" onChange={this.onSong2Change} />
          </div>
        </div>
        <button onClick={this.onFileUpload}>
          Upload!
        </button>
        {this.fileData()}

        <div class="player">


          <div class="details">
            <div class="now-playing">PLAYING x OF y</div>
            <div class="track-art"></div>
            <div class="track-name">Track Name</div>
            <div class="track-artist">Track Artist</div>
          </div>


          <div class="buttons">
            <div class="prev-track" onclick="prevTrack()">
              <i class="fa fa-step-backward fa-2x"></i>
            </div>
            <div class="playpause-track" onclick="playpauseTrack()">
              <i class="fa fa-play-circle fa-5x"></i>
            </div>
            <div class="next-track" onclick="nextTrack()">
              <i class="fa fa-step-forward fa-2x"></i>
            </div>
          </div>


          <div class="slider_container">
            <div class="current-time">00:00</div>
            <input type="range" min="1" max="100"
              value="0" class="seek_slider" onChange="seekTo()"/>
            <div class ="total-duration">00: 00</div>
          </div>


          <div class="slider_container">
            <i class="fa fa-volume-down"></i>
            <input type="range" min="1" max="100"
              value="99" class="volume_slider" onChange="setVolume()"/>
            <i class ="fa fa-volume-up"></i>
          </div>
        </div>


        <script src="main.js"></script>
      </div>
    );
  }
}

export default App;
