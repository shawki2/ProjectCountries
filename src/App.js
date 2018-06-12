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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Community Member Countries</h1>
        </header>
        <Statistics />
        <Population statisticsList={this.state.statisticsList} inputBoxPopu={this.state.inputBoxPopu.value} />
        <Languages statisticsList={this.state.statisticsList} inputBoxLang={this.state.inputBoxLang} />
      </div>
    );
  }
}

export default App;
