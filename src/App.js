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
    if(this.state.activeCountry.dateUpdated){
      return (
        <div>{`Government data from ${this.state.activeCountry.dateUpdated.toDateString()} at ${this.state.activeCountry.dateUpdated.toTimeString()}`}</div>
      );
    }
    else {
      <div></div>
    }
  }

  renderContent() {
    if (!this.state.loading) {
      return (
        <div>
          <h2 className="text-center text-6xl leading-loose md:text-8xl hover:animate-pulse py-12">
            {Math.round(this.state.vaccineCount).toLocaleString()}
          </h2>
          <div className="text-center mx-6 py-2">
            People in {this.state.activeCountry.formattedName} have received their first dose of Covid-19 vaccine
            (estimated).
          </div>
          <div className="text-center mx-6 py-2">
            That is roughly {this.state.percentageOfPopulation.toFixed(2)}% of {this.state.activeCountry.formattedName}'s population.
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
        <footer className="absolute bottom-0 w-full p-4 mx-auto text-center">
          {this.getFormattedTime()}
        </footer>
      </div>
    );
  }

  setActiveCountry(activeCountry) {
    this.setState({
      loading: true
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

    this.totalInterval = setInterval(
      () =>
        this.setState({
          vaccineCount: this.state.vaccineCount + this.state.valueToAdd,
        }),
      1000
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
}

export default App;
