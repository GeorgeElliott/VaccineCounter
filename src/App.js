import React from "react";
import NavBar from "./NavBar";
import Loader from "./Loader";
import Modal from "./Modal";
import {ThemeProvider} from "./themings/themeContext"

class App extends React.Component {
  state = {
    loading: true,
    countries: [
      {
        code: "uk",
        population: 68123219,
        vaccineCount: 34346273,
        vaccineCountFullDose: 14940984,
        dateUpdated: new Date(2021, 4, 1, 16, 0, 0, 0),
        dailySevenDayAverage: 117407.1,
        dailySevenDayAverageFullDose: 407471.1,
        formattedName: "the United Kingdom",
        buttonText: "U.K.",
      },
      {
        code: "eng",
        population: 56290000,
        vaccineCount: 28771540,
        vaccineCountFullDose: 12506188,
        dateUpdated: new Date(2021, 4, 1, 16, 0, 0, 0),
        dailySevenDayAverage: 95526.9,
        dailySevenDayAverageFullDose: 345643.4,
        formattedName: "England",
        buttonText: "England",
      },
      {
        code: "nir",
        population: 1890000,
        vaccineCount: 932426,
        vaccineCountFullDose: 422234,
        dateUpdated: new Date(2021, 4, 1, 16, 0, 0, 0),
        dailySevenDayAverage: 5985.9,
        dailySevenDayAverageFullDose: 11975,
        formattedName: "Northern Ireland",
        buttonText: "N.Ireland",
      },
      {
        code: "scot",
        population: 5460000,
        vaccineCount: 2811343,
        vaccineCountFullDose: 1263862,
        dateUpdated: new Date(2021, 4, 1, 16, 0, 0, 0),
        dailySevenDayAverage: 6676.6,
        dailySevenDayAverageFullDose: 38668.9,
        formattedName: "Scotland",
        buttonText: "Scotland",
      },
      {
        code: "wal",
        population: 3150000,
        vaccineCount: 1830964,
        vaccineCountFullDose: 748700,
        dateUpdated: new Date(2021, 4, 1, 16, 0, 0, 0),
        dailySevenDayAverage: 104408.3,
        dailySevenDayAverageFullDose: 11183.9,
        formattedName: "Wales",
        buttonText: "Wales",
      },
    ],
    activeCountry: {},
    valueToAdd: null,
    percentageOfPopulation: null,
    fullDoseToggled: false,
  };

  componentDidMount() {
    var activeCountry = this.state.countries.find((x) => x.code === "uk");
    this.setActiveCountry(activeCountry);
  }

  componentWillUnmount() {
    this.stopIntervals();
  }

  stopIntervals() {
    clearInterval(this.totalInterval);
    clearInterval(this.percentInterval);
  }

  getFormattedTime() {
    if (this.state.activeCountry && this.state.activeCountry.dateUpdated) {
      return (
        <div>{`Based on data published at ${this.state.activeCountry.dateUpdated.toLocaleString()}`}</div>
      );
    } else {
      <div></div>;
    }
  }

  renderContent() {
    if (!this.state.loading) {
      return (
        <div className="relative">
          <Modal formattedTime={this.getFormattedTime} />
          <h2 className="text-center text-6xl leading-loose md:text-8xl py-12">
            {Math.floor(this.state.vaccineCount).toLocaleString()}
          </h2>
          <div className="text-center  md:text-lg text-sm mx-6 py-2">
            People in {this.state.activeCountry.formattedName} have received{" "}
            {!this.state.fullDoseToggled
              ? "their first dose "
              : "all required doses "}
            of the Covid-19 vaccine (estimated).
          </div>
          <div className="text-center md:text-lg text-sm mx-6 py-2">
            That is roughly {this.state.percentageOfPopulation.toFixed(2)}% of{" "}
            {this.state.activeCountry.formattedName}'s population.
          </div>
          <div className="text-center text-xs mx-6 py-2">
            {this.getFormattedTime()}
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }

  render() {
    return (
      <ThemeProvider>
        <div>
          <header className="w-full mx-auto p-4 md:absolute">
            <NavBar
              countries={this.state.countries}
              activeCountry={
                this.state.activeCountry ? this.state.activeCountry.code : "uk"
              }
              toggleCountry={this.changeActiveCountry}
              toggleFullDose={this.toggleFullDose}
            />
          </header>
          <main className="flex md:h-screen h-full flex-row justify-center items-center flex-grow">
            {this.renderContent()}
          </main>
        </div>
      </ThemeProvider>
    );
  }

  setActiveCountry(activeCountry, isFullDose = false) {
    this.setState({
      loading: true,
    });
    const dateDiff = new Date().getTime() - activeCountry.dateUpdated.getTime();
    const secondsBetween = Math.abs(dateDiff) / 1000;
    const vaccinesPerSecond =
      (!isFullDose
        ? activeCountry.dailySevenDayAverage
        : activeCountry.dailySevenDayAverageFullDose) / 86400;
    const baseVaccineCount = !isFullDose
      ? activeCountry.vaccineCount
      : activeCountry.vaccineCountFullDose;
    const vaccineCount = baseVaccineCount + secondsBetween * vaccinesPerSecond;
    this.setState({
      activeCountry: activeCountry,
      valueToAdd: vaccinesPerSecond,
      vaccineCount: vaccineCount,
      percentageOfPopulation: (vaccineCount / activeCountry.population) * 100,
      loading: false,
    });

    this.totalInterval = setInterval(() => {
      this.setState({
        vaccineCount: this.state.vaccineCount + this.state.valueToAdd,
      });
    }, 1000);

    this.percentInterval = setInterval(
      () =>
        this.setState({
          percentageOfPopulation:
            (this.state.vaccineCount / this.state.activeCountry.population) *
            100,
        }),
      10000
    );
  }

  changeActiveCountry = (code) => {
    this.stopIntervals();
    this.setActiveCountry(
      this.state.countries.find((x) => x.code === code),
      this.state.fullDoseToggled
    );
  };

  toggleFullDose = (isToggled) => {
    this.setState({
      fullDoseToggled: isToggled,
    });
    this.stopIntervals();
    this.setActiveCountry(this.state.activeCountry, isToggled);
  };
}

export default App;
