import React, { Component } from "react";
import Statistic from "./Statistic";
import "./Statistics.css";
import people from "../data/members.js";

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = { regions: [], distinctRegions: [], regionSelected: "" };
    }

    countries = people.map(person => person.country);
    distinctCountries = Array.from(new Set(this.countries));

    regions = [];
    distinctRegions = [];

    // componentDidMount() {
    //     this.distinctCountries.map(country => {
    //         fetch("https://restcountries.eu/rest/v2/name/" + country)
    //             .then(data => { return data.json(); })
    //             .then(response => {
    //                 this.regions.push(response[0].region);
    //                 this.setState({
    //                     regions: this.regions
    //                 });
    //             });
    //     });
    // }
    getTotalRegions() {
        const regionFilter = this.props.statisticsList.filter(
            list => list.country.includes(this.distinctCountries))
            .map(
            country => country.regions
            );
        console.log(regionFilter);

        const distinctRegions = Array.from(new Set(this.regionFilter));

        return distinctRegions;
        console.log(distinctRegions);

        }

    // getRegions2() {
    //     const distinctRegions = Array.from(new Set(this.getTotalRegions()));

    //     return distinctRegions;
    // }
    //  getRegions() {
    //     const distinctRegions = Array.from(new Set(this.state.regions));

    //     return distinctRegions;
    // }


    setRegion(me, clickEvent) {
        const region = clickEvent.target.value;

        me.setState({
            regionSelected: region
        });

    }

    getSelectPoublation() {
        // const getCheck = this.getRegions();
        const getStatisticsList = this.props.statisticsList;

        const populationFilter = getStatisticsList.filter(
            list => list.regions.includes(this.regionSelected))
            .map(
            country => country.population
            );
        console.log(populationFilter);
    }

    render() {

        var distinctRegions = this.getTotalRegions();
        console.log(this.getSelectPoublation());
       // console.log(this.setRegion());

        return (
            <div className="Statistics">
                <Statistic total={people.length} label="Total Members" />
                <Statistic
                    total={this.distinctCountries.length}
                    label="Total Countries"
                />
                <div className="Region">
                    <Statistic total={this.getTotalRegions().length} label="Total Regions" />
                        <select onChange={this.getTotalRegions()}>

                        {distinctRegions.map((result, value) => (
                            <option key={value}>{result}</option>
                        ))}
                        <option >Please Select Region </option>
                    </select>
                </div>
            </div>
        );
    }
}

export default Statistics;
