import React from "react";
import "./Languages.css";

class Languages extends React.Component {
  getTotalLang() {
    const languagesList = this.props.filterStatisticsList
      .filter(list => list.languages.includes(this.props.inputBoxLang))
      .reduce((result, item) => {
        const languages = item.languages.split(", ");
        return result.concat(languages);
      }, []);

    return [...new Set(languagesList)];

    // var languagesFilter = this.props.filterStatisticsList.map(
    //   country => country.languages
    // );
    // var distinctLanguages = [...new Set(languagesFilter)]
    // console.log("distinctLanguages: ",  distinctLanguages)
    // return distinctLanguages
  }
  getInputLang() {
    var languagesFilter = this.props.filterStatisticsList.filter(
      list => list.languages.includes(this.props.inputBoxLang.value)).map(
      country => country.languages);
    var distinctLanguages = [...(new Set(languagesFilter))];
    return distinctLanguages
    //until here for languages companents
  }

  render() {
    console.log(this.getTotalLang())
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
            {this.props.filterStatisticsList
              .filter(list => list.languages.includes(this.props.inputBoxLang))
              .sort((a, b) => b.languageCount - a.languageCount)
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
              {console.log(this.getTotalLang())}
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
export default Languages;
