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
          ); //.map();
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
            (languageName = countryInfo.languages.length == 2)
          ) {
            languageName =
              countryInfo.languages[0].name +
              ", " +
              countryInfo.languages[1].name;
          } else if (
            countryInfo !== undefined &&
            (languageName = countryInfo.languages.length == 1)
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

          // languages: languageName
          //languages: countryInfo.languages.name

          //languages: countryInfo.languages.map(lang => lang.name),
          //region: countryInfo.region
        });
        console.log(membersMatching);

        let totalPopulation = 0;
        for (var i = 0; i < membersMatching.length; i++) {
          totalPopulation += membersMatching[i].population;
        }
        this.setState({
          statisticsList: membersMatching,
          total: totalPopulation,
          totalLang: membersMatching.length
        });
      });
  }
}

export default Cache;
