import React from "react";
import "./Population.css";
import Cache from "./Cache";
class Population extends Cache {
  Submit = e => {
    e.preventDefault();
    const val = this.state.inputBox;
    console.log(val.value);
    val.value = "";
  };
  Change = e => {
    e.preventDefault();
    this.setState({
      inputBox: e.target
    });
  };
  render() {
    return (
      <div className="Population">
        <div className="Population-header">
          <h2>Population of Member Countries</h2>
          <form onSubmit={this.Submit}>
            <input
              type="text"
              placeholder="Search by country"
              onChange={this.Change}
            />
          </form>
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
            {this.state.statisticsList
              .filter(list => list.country.includes(this.state.inputBox.value))
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
              <td colSpan="3">Total Population: {this.state.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
export default Population;
