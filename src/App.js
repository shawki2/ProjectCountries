import React, { Component } from "react";
import Statistics from "./components/Statistics";
import Languages from "./components/Languages";
import Population from "./components/Population";
import Form from "./components/Form";
import members from "./data/members";

import loadData from "./DataLoader";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputBoxLang: { value: "" },
      inputBoxPopu: { value: "" },
      statisticsList: [],
      fields: {},
      filterStatisticsList: []
    };

    loadData().then(data => {
      this.setState(data);
    });
  }
  
  updateStatistics = (data) => {
    this.setState({ filterStatisticsList: data });
  }
  PopSubmit = e => {
    e.preventDefault();
    const val = this.state.inputBoxPopu;
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
    val.value = "";
  };
  Change = e => {
    e.preventDefault();
    this.setState({
      inputBoxLang: e.target
    });
  };
  onSubmit = fields => {
    var item = fields;
    item.name = item.membersName;
    item.country = item.countryName;
    delete item.membersName;
    delete item.countryName;
    members.push(item);
    this.setState({ members: members });

    loadData().then(data => {
      this.setState(data);
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Community Member Countries</h1>
        </header>


        <Statistics statisticsList={this.state.statisticsList}
          filterStatisticsList={this.state.filterStatisticsList}
          updateData={this.updateStatistics} />

         <Form onSubmit={fields => this.onSubmit(fields)} wholeCountries={this.state.wholeCountries} />
        <Population statisticsList={this.state.statisticsList}
          filterStatisticsList={this.state.filterStatisticsList}
          updateData={this.updateStatistics}
          PopChange={this.PopChange}
          PopSubmit={this.PopSubmit}
          inputBoxPopu={this.state.inputBoxPopu.value} />
        <Languages statisticsList={this.state.statisticsList}
          filterStatisticsList={this.state.filterStatisticsList}
          updateData={this.updateStatistics}
          inputBoxLang={this.state.inputBoxLang.value}
          Change={this.Change}
          Submit={this.Submit} />
      </div>
    );
  }
}

export default App;
