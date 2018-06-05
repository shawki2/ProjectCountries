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
          console.log(countryInfo);

          let languageName;
          if (
            countryInfo !== undefined &&
            (countryInfo.languages.length === 2)
          ) {
            languageName =
              countryInfo.languages[0].name +
              ", " +
              countryInfo.languages[1].name;
          } else if (
            countryInfo !== undefined &&
            (countryInfo.languages.length === 1)
          ) {
            // let languageName =countryInfo.languages[0].name +  ", " +countryInfo.languages[1].name;
            languageName = countryInfo.languages[0].name;
          } else languageName = "language Not Found";

          return {
            name: result.name,
            country: result.country,
            population: countryName,
            languages: languageName
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

        this.setState({
          statisticsList: membersMatching,
          total: totalPopulation,
          totalLang: totalLanguages
        });
      });
  }
}

export default Cache;
