import React, { Component } from "react";
import Statistic from "./Statistic";
import "./Statistics.css";
import people from "../data/members.js";

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = { regions: [], Region: [] };
  }

  countries = people.map(person => person.country);
  distinctCountries = Array.from(new Set(this.countries));

  regions = [];

  Region = [];

  componentDidMount() {
    this.distinctCountries.map(country => {
      fetch("https://restcountries.eu/rest/v2/name/" + country)
        .then(data => {
          return data.json();
        })

        .then(response => {
          this.regions.push(response[0].region);
          this.setState({
            regions: this.regions
          });
        });
    });
  }

  getRegions() {
    return Array.from(new Set(this.state.regions));
  }

  render() {
    return (
      <div className="Statistics">
        <Statistic total={people.length} label="Total Members" />
        <Statistic
          total={this.distinctCountries.length}
          label="Total Countries"
        />

        <div className="Region">
          <Statistic total={this.getRegions().length} label="Total Regions" />
          <select>
            <option>{this.getRegions()}</option>
            <option selected>Please Select Region </option>
          </select>
        </div>
      </div>
    );
  }
}

export default Statistics;
