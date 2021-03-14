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
        vaccineCount: 23684103,
        vaccineCountFullDose: 1532754,
        dateUpdated: new Date(2021, 2, 13, 16, 0, 0, 0),
        dailySevenDayAverage: 269689.3,
        dailySevenDayAverageFullDose: 63130.6,
        formattedName: "the United Kingdom",
        buttonText: "U.K.",
      },
      {
        code: "wal",
        population: 3150000,
        vaccineCount: 1084329,
        vaccineCountFullDose: 250026,
        dateUpdated: new Date(2021, 2, 13, 16, 0, 0, 0),
        dailySevenDayAverage: 14415.7,
        dailySevenDayAverageFullDose: 11694.6,
        formattedName: "Wales",
        buttonText: "Wales",
      },
      {
        code: "eng",
        population: 56290000,
        vaccineCount: 20111189,
        vaccineCountFullDose: 1076426,
        dateUpdated: new Date(2021, 2, 13, 16, 0, 0, 0),
        dailySevenDayAverage: 231345.4,
        dailySevenDayAverageFullDose: 44275.1,
        formattedName: "England",
        buttonText: "England",
      },
      {
        code: "nir",
        population: 1890000,
        vaccineCount: 621462,
        vaccineCountFullDose: 50052,
        dateUpdated: new Date(2021, 2, 13, 16, 0, 0, 0),
        dailySevenDayAverage: 6320.4,
        dailySevenDayAverageFullDose: 1136.6,
        formattedName: "Northern Ireland",
        buttonText: "N.Ireland",
      },
      {
        code: "scot",
        population: 5460000,
        vaccineCount: 1867123,
        vaccineCountFullDose: 156250,
        dateUpdated: new Date(2021, 2, 13, 16, 0, 0, 0),
        dailySevenDayAverage: 17607.7,
        dailySevenDayAverageFullDose: 6024.1,
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
              ? "their first dose"
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
