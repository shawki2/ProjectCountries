import React from "react";
import "./Languages.css";

export default class Form extends React.Component {
  state = {
    membersName: "",
    countryName: ""
  };

  change = e => {
    var letters = e.target.value;
    if (letters.length !== 0) {
      letters = letters.toLowerCase();
      letters = letters[0].toUpperCase() + letters.slice(1);
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
