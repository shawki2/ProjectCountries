import React from "react";
import members from "../data/members";
class Cache extends React.Component {
  constructor() {
    super();
    this.state = {
      inputBoxLang: { value: "" },
      inputBoxPopu: { value: "" },
      statisticsList: []
    };

    fetch("https://restcountries.eu/rest/v2/")
      .then(data => {
        return data.json();
      })
      .then(serverStatistics => {
        const membersMatching = members.map(result => {
          var countryInfo = serverStatistics.find(
            serverResult => serverResult.name === result.country
          );
          if (countryInfo === undefined) {
            countryInfo = serverStatistics.find(serverResult =>
              serverResult.name.includes(result.country)
            );
          }

          let countryName = "";
          if (countryInfo === undefined) {
            countryName = "Country Not Found";
          } else {
            countryName = countryInfo.population;
          }

          let languageName;
          if (countryInfo !== undefined && countryInfo.languages.length >= 2) {
            languageName = countryInfo.languages[0].name;
            for (i = 1; i < countryInfo.languages.length; i++) {
              languageName =
                languageName + ", " + countryInfo.languages[i].name;
            }
          } else if (
            countryInfo !== undefined &&
            countryInfo.languages.length === 1
          ) {
            languageName = countryInfo.languages[0].name;
          } else languageName = "language Not Found";

          return {
            name: result.name,
            country: result.country,
            population: countryName,
            languages: languageName
          };
        });

        console.log(membersMatching);

        let totalLanguages = 0;
        let languagesFilter = membersMatching.filter(list=>list.country.includes(this.state.inputBoxLang.value)).map(country => country.languages);
        let distinctLanguages = Array.from(new Set(languagesFilter));
        totalLanguages = distinctLanguages.length;
        //until here for languages companents
        let totalPopulation = 0;
        let populationFilter = membersMatching.filter(list=>list.country.includes(this.state.inputBoxPopu.value)).map(
          country => country.population
        );
        let distinctPopulation = Array.from(new Set(populationFilter));

        for (var i = 0; i < distinctPopulation.length; i++) {
          totalPopulation += distinctPopulation[i];
        }
        //until here for population companents

        this.setState({
          statisticsList: membersMatching,
          total: totalPopulation,
          totalLang: totalLanguages
        });
      });
  }
}

export default Cache;
