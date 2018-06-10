import React from "react";
import members from "../data/members";
import  "./Languages";

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
          let allLanguages, languageNames;
          allLanguages = countryInfo.languages.map(lang => lang.name);
          languageNames = allLanguages.join(", ");

          return {
            name: result.name,
            country: result.country,
            population: countryName,
            languages: languageNames
          };
        });
        // let totalPopulation = 0;
        // let populationFilter = membersMatching.map(
        //   country => country.population
        // );
        // let distinctPopulation = Array.from(new Set(populationFilter));

        // for (var i = 0; i < distinctPopulation.length; i++) {
        //   totalPopulation += distinctPopulation[i];
        // }
    
        console.log(membersMatching);
        //start here for languages companents
        let languagesFilter = membersMatching
          .filter(list => list.country.includes(this.state.inputBoxLang.value))
          .map(country => country.languages).join(", ").split(", ");
        let distinctLanguages = Array.from(new Set(languagesFilter));
        let totalLanguages = distinctLanguages.length;
        console.log(languagesFilter);
        //until here for languages companents

        //start here for population companents
        console.log(this.state.inputBoxLang.value)
        let totalPopulation = 0;
        let populationFilter = membersMatching.filter(list => list.country.includes(this.state.inputBoxPopu.value)).map(country => country.population);
        let distinctPopulation = Array.from(new Set(populationFilter));

        for (let i = 0; i < distinctPopulation.length; i++) {
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
