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

        this.setState({
          statisticsList: membersMatching
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
              <td colSpan="3">Total Population: </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default Population;
