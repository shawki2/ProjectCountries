import members from "./data/members";

function loadData() {
    return fetch("https://restcountries.eu/rest/v2/")
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
                if (countryInfo === undefined) {countryName = 0;
                    countryInfo = { languages: [{ name: "Country Not Found" }] };
                } else {
                    countryName = countryInfo.population;
                }
                let allLanguages, languageNames;
                allLanguages = countryInfo.languages.map(lang => lang.name);
                languageNames = allLanguages.join(",");
                return {
                    name: result.name,
                    country: result.country,
                    population: countryName,
                    languages: languageNames,
                    languageCount: countryInfo.languages.length,
                    regions: countryInfo.region
                };
            });
            return {
                statisticsList: membersMatching,
                filterStatisticsList: membersMatching,
            };
        });
}

export default loadData;
