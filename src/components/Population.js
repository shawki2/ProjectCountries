import React from "react";
import "./Population.css";
import Cache from "./Cache";
class Population extends Cache {
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
            {this.state.statisticsList.map((result, index) => (
              <tr key={index}>
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
