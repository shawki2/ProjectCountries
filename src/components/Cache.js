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
            serverResult => serverResult.name.includes(result.country)
          );
          let countryName = "";
          if (countryInfo === undefined) {
            countryName = "Country Not Found";
          } else {
            countryName = countryInfo.population;
          }
          let allLanguages = countryInfo.languages.map(lang => lang.name);
          let languageNames = allLanguages.join(", ");
          console.log(languageNames);
          return {
            name: result.name,
            country: result.country,
            population: countryName,
            languages: languageNames
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
        let totalLanguages = 0;
        let languagesFilter = membersMatching.map(
          country => country.languages
        );
        let distinctLanguages = Array.from(new Set(languagesFilter));
        totalLanguages = distinctLanguages.length

        populationFilter = membersMatching.map(
          country => country.population
        );
        distinctPopulation = Array.from(new Set(populationFilter));

        for (i = 0; i < distinctPopulation.length; i++) {
          totalPopulation += distinctPopulation[i];
        }
        this.setState({
          statisticsList: membersMatching,
          total: totalPopulation,
          totalLang: totalLanguages
        });
      });
  }
}

export default Cache;
