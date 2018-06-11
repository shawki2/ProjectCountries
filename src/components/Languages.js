import React from "react";
import "./Languages.css";

class Languages extends React.Component {
  Submit = e => {
    e.preventDefault();
    const val = this.state.inputBoxLang;
    console.log(val.value);
    val.value = "";
  };
  Change = e => {
    e.preventDefault();
    this.setState({
      inputBoxLang: e.target
    });
  };
  getTotalLang() {
    var languagesFilter = this.props.statisticsList.map(
      country => country.languages
    );
    var distinctLanguages = 0;
    distinctLanguages = [...new Set(languagesFilter)]
    return (distinctLanguages);
  }
  getInputLang() {
    var languagesFilter = this.props.statisticsList.filter(
      list => list.country.includes(this.props.inputBoxLang.value)).map(country => country.languages);
    var distinctLanguages = [...(new Set(languagesFilter))];
    return (distinctLanguages);
    //until here for languages companents
  }
  render() {

    return (
      <div className="Languages">
        <div className="Languages-header">
          <h2>Languages Spoken in Member Countries</h2>
          <form onSubmit={this.Submit}>
            <input type="text" placeholder="Search by language" onChange={this.Change} />
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
            {this.props.statisticsList.map((result, index) => (
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
