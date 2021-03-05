import React from "react";
import NavBar from "./NavBar";
import Loader from "./Loader";
import Modal from "./Modal";

class App extends React.Component {
  state = {
    loading: true,
    countries: [
      {
        code: "uk",
        population: 68123219,
        vaccineCount: 20982571,
        vaccineCountFullDose: 963862,
        dateUpdated: new Date(2021, 2, 5, 16, 0, 0, 0),
        dailySevenDayAverage: 327248,
        dailySevenDayAverageFullDose: 37592,
        formattedName: "the United Kingdom",
        buttonText: "U.K.",
      },
      {
        code: "wal",
        population: 3150000,
        vaccineCount: 951540,
        vaccineCountFullDose: 139445,
        dateUpdated: new Date(2021, 2, 5, 16, 0, 0, 0),
        dailySevenDayAverage: 8895.7,
        dailySevenDayAverageFullDose: 9942,
        formattedName: "Wales",
        buttonText: "Wales",
      },
      {
        code: "eng",
        population: 56290000,
        vaccineCount: 17785702,
        vaccineCountFullDose: 684220,
        dateUpdated: new Date(2021, 2, 5, 16, 0, 0, 0),
        dailySevenDayAverage: 284387.1,
        dailySevenDayAverageFullDose: 20325.9,
        formattedName: "England",
        buttonText: "England",
      },
      {
        code: "nir",
        population: 1890000,
        vaccineCount: 556721,
        vaccineCountFullDose: 40139,
        dateUpdated: new Date(2021, 2, 5, 16, 0, 0, 0),
        dailySevenDayAverage: 9304,
        dailySevenDayAverageFullDose: 1214.6,
        formattedName: "Northern Ireland",
        buttonText: "N.Ireland",
      },
      {
        code: "scot",
        population: 5460000,
        vaccineCount: 1688608,
        vaccineCountFullDose: 100058,
        dateUpdated: new Date(2021, 2, 5, 16, 0, 0, 0),
        dailySevenDayAverage: 24661.1,
        dailySevenDayAverageFullDose: 6199.6,
        formattedName: "Scotland",
        buttonText: "Scotland",
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
        <div>{`Government data from ${this.state.activeCountry.dateUpdated.toDateString()} at ${this.state.activeCountry.dateUpdated.toTimeString()}`}</div>
      );
    } else {
      <div></div>;
    }
  }

  renderContent() {
    if (!this.state.loading) {
      return (
        <div className="relative">
          <Modal formattedTime={this.getFormattedTime}/>
          <h2 className="text-center text-6xl leading-loose md:text-8xl py-12">
            {Math.floor(this.state.vaccineCount).toLocaleString()}
          </h2>
          <div className="text-center text-sm mx-6 py-2">
            People in {this.state.activeCountry.formattedName} have received{" "}
            {!this.state.fullDoseToggled
              ? "their first dose"
              : "all required doses"}
            of the Covid-19 vaccine (estimated).
          </div>
          <div className="text-center text-sm mx-6 py-2">
            That is roughly {this.state.percentageOfPopulation.toFixed(2)}% of {" "}
            {this.state.activeCountry.formattedName}'s population.
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }

  render() {
    return (
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
        <footer className="md:absolute bottom-0 w-full p-4 md:pt-10 mx-auto text-center">
          {this.getFormattedTime()}
        </footer>
      </div>
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
    this.setActiveCountry(this.state.activeCountry, isToggled);
  };
}

export default App;
