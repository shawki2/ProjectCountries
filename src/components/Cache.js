import React from "react";
import members from "../data/members";
class Cache extends React.Component {
  constructor() {
    super();
    this.state = {
      inputBox: { value: "" },
      statisticsList: []
    };

    fetch("https://restcountries.eu/rest/v2/")
      .then(data => {
        return data.json();
      })
      .then(serverStatistics => {
        const membersMatching = members.map(result => {
          const countryInfo = serverStatistics.find(serverResult =>
            serverResult.name.includes(result.country)
          );

          let countryName = "";
          if (countryInfo === undefined) {
            countryName = "Country Not Found";
          } else {
            countryName = countryInfo.population;
          }

          return {
            name: result.name,
            country: result.country,
            population: countryName,
            languages: countryInfo.languages.map(lang => lang.name),
            region: countryInfo.region
          };
        });
        let totalPopulation = 0;
        for (var i = 0; i < membersMatching.length; i++) {
          totalPopulation += membersMatching[i].population;
        }
        this.setState({
          statisticsList: membersMatching,
          total: totalPopulation
        });
      });
  }
}

export default Cache;
