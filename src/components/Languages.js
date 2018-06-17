import React from "react";
import "./Languages.css";

class Languages extends React.Component {
  getTotalLang() {
    var languagesFilter = this.props.statisticsList
      .filter(list => list.country.includes(this.props.inputBoxLang))
      .map(country => country.languages);
    var distinctLanguages = 0;
    languagesFilter = languagesFilter.join(",").split(",");
    distinctLanguages = [...new Set(languagesFilter)];
    return distinctLanguages;
  }

  render() {
    return (
      <div className="Languages">
        <div className="Languages-header">
          <h2>Languages Spoken in Member Countries</h2>
          <form onSubmit={this.props.Submit}>
            <input
              type="text"
              placeholder="Search by language"
              onChange={this.props.Change}
            />
          </form>
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
            {this.props.statisticsList
              .filter(list => list.country.includes(this.props.inputBoxLang))
              .map((result, index) => (
                <tr key={index}>
                  <td>{result.name}</td>
                  <td>{result.country}</td>
                  <td>{result.languages}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Languages: {this.getTotalLang().length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
export default Languages;
