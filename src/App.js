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
      <div>
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
      </div>
    );
  }
}

export default App;
