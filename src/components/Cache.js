import React from "react";
import members from "../data/members";
class Cache extends React.Component {
  constructor() {
    super();
    this.state = {
      statisticsList: []
    };

    fetch("https://restcountries.eu/rest/v2/")
      .then(data => {
        return data.json();
      })
      .then(serverStatistics => {
        const membersMatching = members.map(result => {
          const countryInfo = serverStatistics.find(
            serverResult => result.country === serverResult.name
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
        let populationFilter = membersMatching.map(
          country => country.population
        );
        let distinctPopulation = Array.from(new Set(populationFilter));

        for (var i = 0; i < distinctPopulation.length; i++) {
          totalPopulation += distinctPopulation[i];
        }
        this.setState({
          statisticsList: membersMatching,
          total: totalPopulation
        });
      });
  }
}

export default Cache;
