import React from "react";
import "./Languages.css";
import Cache from "./Cache";
class Languages extends Cache {
  //countries = people.map(person => person.country);
  //distinctCountries = Array.from(new Set(this.countries));

  render() {
    return (
      <div className="Languages">
        <div className="Languages-header">
          <h2>Languages Spoken in Member Countries</h2>
          <input type="text" placeholder="Search by language" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Languages</th>
            </tr>
          </thead>
          <tbody>
            {this.state.statisticsList.map((result, index) => (
              <tr key={index}>
                <td>{result.name}</td>
                <td>{result.country}</td>
                <td>{result.languages}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Languages: {this.state.totalLang}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
export default Languages;
