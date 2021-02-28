import React from "react";
import NavBar from "./NavBar";
import Loader from "./Loader";

class App extends React.Component {
  state = {
    loading: true,
    countries: [
      {
        code: "uk",
        population: 68123219,
        vaccineCount: 19682048,
        dateUpdated: new Date(2021, 1, 27, 16, 0, 0, 0),
        dailySevenDayAverage: 347800.9,
        formattedName: "the United Kingdom",
        minUpdateInterval: 4000,
        maxUpdateInterval: 6020,
      },
      {
        code: "wal",
        population: 3150000,
        vaccineCount: 916336,
        dateUpdated: new Date(2021, 1, 27, 16, 0, 0, 0),
        dailySevenDayAverage: 8198.9,
        formattedName: "Wales",

      },
      {
        code: "eng",
        population: 56290000,
        vaccineCount: 16679881,
        dateUpdated: new Date(2021, 1, 27, 16, 0, 0, 0),
        dailySevenDayAverage: 305986.1,
        formattedName: "England",
        minUpdateInterval: 3000,
        maxUpdateInterval: 4700,
      },
      {
        code: "nir",
        population: 1890000,
        vaccineCount: 515678,
        dateUpdated: new Date(2021, 1, 27, 16, 0, 0, 0),
        dailySevenDayAverage: 10394.4,
        formattedName: "Northern Ireland",
      },
      {
        code: "scot",
        population: 5460000,
        vaccineCount: 1570153,
        dateUpdated: new Date(2021, 1, 27, 16, 0, 0, 0),
        dailySevenDayAverage: 22501.4,
        formattedName: "Scotland",
      },
    ],
    activeCountry: {},
    valueToAdd: null,
    percentageOfPopulation: null,
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
    if (this.state.activeCountry.dateUpdated) {
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
        <div>
          <h2 className="text-center text-6xl leading-loose md:text-8xl py-12">
            {Math.floor(this.state.vaccineCount).toLocaleString()}
          </h2>
          <div className="text-center mx-6 py-2">
            People in {this.state.activeCountry.formattedName} have received
            their first dose of Covid-19 vaccine (estimated).
          </div>
          <div className="text-center mx-6 py-2">
            That is roughly {this.state.percentageOfPopulation.toFixed(2)}% of{" "}
            {this.state.activeCountry.formattedName}'s population.
          </div>
          <div className="text-center mx-6 py-2">
            <a
              className="underline"
              target="_blank"
              rel="noreferrer"
              href="https://coronavirus.data.gov.uk/details/vaccinations"
            >
              We get our estimate using vaccination data from here.
            </a>
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
          <NavBar toggleCountry={this.changeActiveCountry} />
        </header>
        <main className="flex md:h-screen h-full flex-row justify-center items-center flex-grow">
          {this.renderContent()}
        </main>
        <footer className="md:absolute relative bottom-0 w-full p-4 sm:pt-10 sm:pb-4 sm:px-4 mx-auto text-center">
          {this.getFormattedTime()}
        </footer>
      </div>
    );
  }

  setActiveCountry(activeCountry) {
    this.setState({
      loading: true,
    });
    var dateDiff = new Date().getTime() - activeCountry.dateUpdated.getTime();
    var secondsBetween = Math.abs(dateDiff) / 1000;
    var vaccinesPerSecond = activeCountry.dailySevenDayAverage / 86400;
    const vaccineCount =
      activeCountry.vaccineCount + secondsBetween * vaccinesPerSecond;

    this.setState({
      activeCountry: activeCountry,
      valueToAdd: vaccinesPerSecond,
      vaccineCount: vaccineCount,
      percentageOfPopulation: (vaccineCount / activeCountry.population) * 100,
      loading: false,
    });

    var interval = activeCountry.code === "uk" || activeCountry.code === "eng" ?
      Math.floor(Math.random() * (activeCountry.maxUpdateInterval - activeCountry.minUpdateInterval)) + activeCountry.minUpdateInterval :
      1000;

    this.totalInterval = setInterval(
      () => {
        interval = Math.floor(Math.random() * (activeCountry.maxUpdateInterval - activeCountry.minUpdateInterval)) + activeCountry.minUpdateInterval;
        if(vaccinesPerSecond > 3){
          var now = new Date();
          var future = new Date(now.getTime() + interval);
          let dateDiff = future.getTime() - now.getTime();
          var secondsBetween = Math.abs(dateDiff) / 1000;
          this.animateValue(this.state.vaccineCount, this.state.vaccineCount + secondsBetween * vaccinesPerSecond, 500);
        }
        else
        {
          interval = 1000;
          this.setState({
            vaccineCount: this.state.vaccineCount + this.state.valueToAdd,
          });
        }
      },
      interval
    );

    this.percentInterval = setInterval(
      () =>
        this.setState({
          percentageOfPopulation:
            (this.state.vaccineCount / activeCountry.population) * 100,
        }),
      10000
    );
  }

  changeActiveCountry = (code) => {
    this.stopIntervals();
    this.setActiveCountry(this.state.countries.find((x) => x.code === code));
  };

  animateValue(start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      this.setState({
        vaccineCount: Math.floor(progress * (end - start) + start),
      });
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
}

export default App;
