import React, { Component } from "react";
import Languages from "../components/Languages";

class Members2 extends Component {
  constructor() {
    super();
    this.state = { languages: [] };
  }
  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ languages: data });
      });
  }
  render() {
    return; // /* return <div></div>;*/
    <div>
      {/*JSON.stringify(this.state.languages)*/}
      {this.state.languages.map(album => {
          return <Album key={album.albumId} releaseDate={album.releaseDate} album={album.collectionName} imageUrl={album.artworkUrl100} genre={album.primaryGenreName} />;
        })}
    </div>;
  }
}

export default Members2;
