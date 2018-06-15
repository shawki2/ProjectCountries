import React, { Component } from "react";
import Statistics from "./components/Statistics";
import Languages from "./components/Languages";
import Population from "./components/Population";

import loadData from './DataLoader';
import "./App.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      inputBoxLang: { value: "" },
      inputBoxPopu: { value: "" },
      statisticsList: [],
    };

    loadData().then(data => {
      this.setState(data);
    });
  }
  PopSubmit = e => {

    e.preventDefault();
    const val = this.state.inputBoxPopu;
    console.log(val.value);
    val.value = "";
  };
  PopChange = e => {
    e.preventDefault();
    this.setState({

      inputBoxPopu: e.target
    });
  };
  Submit = e => {

    e.preventDefault();
    const val = this.state.inputBoxLang;
    console.log(val.value);
    val.value = "";
  };
  Change = e => {
    e.preventDefault();
    this.setState({

      inputBoxLang: e.target
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Community Member Countries</h1>
        </header>
        <Statistics />
        <Population statisticsList={this.state.statisticsList} inputBoxPopu={this.state.inputBoxPopu.value} PopChange={this.PopChange} PopSubmit={this.PopSubmit}/>
        <Languages statisticsList={this.state.statisticsList} inputBoxLang={this.state.inputBoxLang.value} Change={this.Change} Submit={this.Submit}/>
      </div>
    );
  }
}

export default App;
