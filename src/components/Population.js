import React, { Component } from "react";
import "./Population.css";
import members from "../data/members";

class Population extends Component {
  constructor() {
    super();
    this.state = {
      statisticsList: []
    };

    fetch("https://restcountries.eu/rest/v2/")
      .then(data => {
        return data.json();
      })
      .then(serverStatistics => {
        const membersMatching = members.map(result => {
          const countryInfo = serverStatistics.find(
            serverResult => result.country === serverResult.name
          );

          return {
            name: result.name,
            country: result.country,
            population: countryInfo.population
          };
        });
        let totalPopulation = 0;
        for (var i = 0; i < membersMatching.length; i++) {
          totalPopulation += membersMatching[i].population;
        }
        this.setState({
          statisticsList: membersMatching,
          total: totalPopulation
        });
      });
  }
  render() {
    return (
      <div className="Population">
        <div className="Population-header">
          <h2>Population of Member Countries</h2>
          <input type="text" placeholder="Search by country" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {this.state.statisticsList.map(result => (
              <tr>
                <td>{result.name}</td>
                <td>{result.country}</td>
                <td>{result.population}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Population: {this.state.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Population;
