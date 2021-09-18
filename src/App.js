import no_img from './no_img.png';
import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';

//import './js/style-transfer';

class App extends Component {
  state = {
    // Initially, no file is selected
    song1: null,
    song2: null,
    isPlaying: false,
    updateTimer: null,
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
          <h4>Please upload two songs and then </h4>
        </div>
      );
    }
  };

  render() {

    return (
      <div class="container">
        <div class="row">
          <div class="col files">
            <input type="file" onChange={this.onSong1Change} />
          </div>
          <div class="col files">
            <input type="file" onChange={this.onSong2Change} />
          </div>
        </div>
        <button onClick={this.onFileUpload}>
          Upload!
        </button>
        {this.fileData()}

        <div>
          <audio ref="audio_tag" src="./static/music/foo.mp3" controls autoPlay />
        </div>
        {/*
        <div class="container mt-3">
          <div class="row">
            <div class="col-12 col-md-4 text-center">
              <div class="box">
                <input type="file" id="contentFile" target="content" class="inputfile inputfile-color" data-multiple-caption="{count} files selected" multiple />
                <label for="contentFile">
                  <span> Album Cover 1 </span>
                </label>
              </div>
              <div class="imageContainer">
                <div class="screen">
                  <img class="col-12" id="contentImg" src={no_img} />
                </div>
              </div>
            </div>
            <div class="col-md-4 text-center">
              <div class="col-12 text-center">
                <button class="btn btn-transfer">
                  <span> Submit </span>
                </button>
              </div>
            </div>
            <div class="col-12 col-md-4 text-center">
              <div class="box">
                <input type="file" id="styleFile" target="style" class="inputfile inputfile-color" data-multiple-caption="{count} files selected" multiple />
                <label for="styleFile">
                  <span> Album Cover 2 </span>
                </label>
              </div>
              <div class="imageContainer">
                <div class="screen">
                  <img class="col-12" id="styleImg" src={no_img} />
                </div>
                <em></em>
              </div>
            </div>
          </div>
          <div class="row m-md-3">
            <div class="col-12 col-md-4 offset-md-4 text-center">
              <div class="canvasContainer col-12">
                <canvas id="stylized" class="d-none"></canvas>
              </div>
            </div>
          </div>
        </div>
        <ScriptTag type="text/javascript" src="./js/style-transfer.js"/>
        */}
      </div>

    );
  }
}

export default App;
