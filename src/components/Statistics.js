import React, { Component } from "react";
import Statistic from "./Statistic";
import "./Statistics.css";
import people from "../data/members.js";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = { regions: [], distinctRegions: [], regionSelected: "" };
  }

  countries = people.map(person => person.country);
  distinctCountries = Array.from(new Set(this.countries));

  regions = [];
  distinctRegions = [];

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

  getDistincRegions() {
    const distinctRegions = Array.from(new Set(this.state.regions));

    return distinctRegions
  }
  getDistincMembers() {
    const newArray = this.props.filterStatisticsList;
    const distinctMembers = Array.from(new Set(newArray));
    console.log('distinctMembers', distinctMembers)

    return distinctMembers
  }


  setRegion = (clickEvent) => {
    const region = clickEvent.target.value;
    const populationFilter = this.props.statisticsList.filter(
      person => person.regions.includes(region)
    )
    this.props.updateData(populationFilter);
    console.log("selectedRigion", populationFilter);
    return populationFilter
  }


  render() {

    console.log('this.props.filterStatisticsList', this.props.filterStatisticsList)
    var distinctRegions = this.getDistincRegions();
    console.log('distinctRegions', distinctRegions.length)
    var distincMembers = this.getDistincMembers();
    console.log('distinctRegions', distincMembers.length)

    return (
      <div className="Statistics">
        <Statistic total={this.getDistincMembers().length} label="Total Members" />
        <Statistic
          total={this.distinctCountries.length}
          label="Total Countries"
        />

        <div className="Region">
          <Statistic total={this.getDistincRegions().length} label="Total Regions" />
          <select onChange={(event) => this.setRegion(event)}>
            {distinctRegions.map((result, value) => (
              <option key={value}>{result}</option>
            ))}
            <option >Please Select Region </option>
          </select>
        </div>
      </div>
    );
  }
}

export default Statistics;
