import React from "react";
import "./Languages.css";

export default class Form extends React.Component {
  state = {
    membersName: "",
    countryName: ""
  };

  change = e => {
    var words = ["of", "Of", "oF", "OF", "and", "And", "aNd", "anD", "ANd", "aND", "AND", "the", "The", "tHe", "thE", "THe", "tHE", "THE", "of)", "Of)", "oF)", "OF)", "and)", "And)", "aNd)", "anD)", "ANd)", "aND)", "AND)", "the)", "The)", "tHe)", "thE)", "THe)", "tHE)", "THE)", "(of", "(Of", "(oF", "(OF", "(and", "(And", "(aNd", "(anD", "(ANd", "(aND", "(AND", "(the", "(The", "(tHe", "(thE", "(THe", "(tHE", "(THE","former","da","Da","dA","DA","part)"];
    var letters = e.target.value;
    if (letters.length !== 0) {
      var letter = letters.split(" ").map(item => {
        if (words.some(a => a.includes(item))) {
          return item.toLowerCase();
        } else {
          if (item.includes('.')){
          return item.toUpperCase();              
          }else if(item.includes("-")) {
            return (item = item.slice(0,item.indexOf("-")+1)+item[item.indexOf("-")+1].toUpperCase() + item.slice(item.indexOf("-")+2))
          }else if(item[0] === "(") {
            item = item.toLowerCase();
            return (item = item[0] + item[1].toUpperCase() + item.slice(2));
          } else {
            item = item.toLowerCase();
            return (item = item[0].toUpperCase() + item.slice(1));
          }
        }
      });
      letters = letter.join(" ");
    }
    this.setState({
      [e.target.name]: letters
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      membersName: "",
      countryName: ""
    });
  };

  render() {
    return (
      <form>
        <input
          name="membersName"
          placeholder="Members name"
          value={this.state.membersName}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="countryName"
          placeholder="Country name"
          value={this.state.countryName}
          onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Add New Member</button>
      </form>
    );
  }
}
