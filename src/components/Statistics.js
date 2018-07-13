import React, { Component } from "react";
import Statistic from "./Statistic";
import "./Statistics.css";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = { regions: [], regionSelected: "" };
  }

  componentWillReceiveProps(newProps) {
    const regions = newProps.statisticsList.map(item => item.regions);
    this.setState({ regions: regions });
  }

  getDistincRegions() {
    const distinctRegions = Array.from(new Set(this.state.regions));

    return distinctRegions
  }

  getDistincMembers() {
    const newArray = this.props.filterStatisticsList;
    const distinctMembers = Array.from(new Set(newArray));

    return distinctMembers
  }

  getDistinctCountries() {
    const countryList = this.props.filterStatisticsList.map(item => item.country);
    return [...new Set(countryList)];
  }

  setRegion = (clickEvent) => {
    const region = clickEvent.target.value;
    const populationFilter = this.props.statisticsList.filter(
      person => person.regions.includes(region)
    )
    this.props.updateData(populationFilter);
    return populationFilter
  }

  render() {
    var distinctRegions = this.getDistincRegions();
    return (
      <div className="Statistics">
        <Statistic total={this.getDistincMembers().length} label="Total Members" />
        <Statistic
          total={this.getDistinctCountries().length}
          label="Total Countries"/>
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
