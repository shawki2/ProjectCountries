import React from "react";
import "./Population.css";
class Population extends React.Component {
  getTotalPopulation() {
    var populationFilter = this.props.statisticsList
      .filter(list => list.country.includes(this.props.inputBoxPopu))
      .map(country => country.population);
    var distinctPopulation = Array.from(new Set(populationFilter));
    var totalPopulation = 0;
    for (let i = 0; i < distinctPopulation.length; i++) {
      totalPopulation += distinctPopulation[i];
    }
    return totalPopulation;
  }

  render() {
    return (
      <div className="Population">
        <div className="Population-header">
          <h2>Population of Member Countries</h2>
          <form onSubmit={this.props.PopSubmit}>
            <input
              type="text"
              placeholder="Search by country"
              onChange={this.props.PopChange}
            />
          </form>{" "}
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
            {this.props.statisticsList
              .sort((a, b) => b.population - a.population)
              .filter(list => list.country.includes(this.props.inputBoxPopu))
              .map((result, index) => (
                <tr key={index}>
                  <td>{result.name}</td>
                  <td>{result.country}</td>
                  <td>{result.population}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Population: {this.getTotalPopulation()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
export default Population;
