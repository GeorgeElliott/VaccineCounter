import React from "react";
import NavBar from "./NavBar";
import Loader from "./Loader";

class App extends React.Component {
  
  state = {
    loading: true,
    caseCount: 19177555,
    dateUpdated: new Date(2021, 1, 26, 16, 0, 0, 0),
    dailySevenDayAverage: 328859,
    valueToAdd: null,
    percentageOfPopulation: null,
  };

  componentDidMount() {
    const ukPopulation = 68122387;
    var dateDiff = new Date().getTime() - this.state.dateUpdated.getTime();
    var secondsBetween = Math.abs(dateDiff) / 1000;
    var vaccinesPerSecond = this.state.dailySevenDayAverage / 86400;
    const caseCount = this.state.caseCount + secondsBetween * vaccinesPerSecond;

    this.setState({
      valueToAdd: vaccinesPerSecond,
      caseCount: caseCount,
      percentageOfPopulation: (caseCount / ukPopulation) * 100,
      loading: false,
    });

    this.totalInterval = setInterval(
      () =>
        this.setState({
          caseCount: this.state.caseCount + this.state.valueToAdd,
        }),
      1000
    );

    this.percentInterval = setInterval(
      () =>
        this.setState({
          percentageOfPopulation: (this.state.caseCount / ukPopulation) * 100,
        }),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.totalInterval);
    clearInterval(this.percentInterval);
  }

  renderContent() {
    if (!this.state.loading) {
      return (
        <div>
          <h2 className="text-center text-6xl leading-loose md:text-8xl hover:animate-pulse">
            {Math.round(this.state.caseCount).toLocaleString()}
          </h2>
          <p className="text-center xs:px-2">
            People recieved their first dose of Covid-19 vaccine (estimated).
          </p>
          <p className="text-center xs:px-2">
            That is roughly {this.state.percentageOfPopulation.toFixed(2)}% of the UK's population.
          </p>
          <p className="text-center  xs:px-2">
            <a
              className="underline"
              target="_blank"
              rel="noreferrer"
              href="https://coronavirus.data.gov.uk/details/vaccinations"
            >
              We get our estimate using vaccination data from here.
            </a>
          </p>
        </div>
      );
    } else {
      return (
        <Loader />
      );
    }
  }

  render() {
    return (
      <div>
        <header className="w-full mx-auto p-4 md:absolute">
          <NavBar />
        </header>
        <main className="flex h-screen flex-row justify-center items-center flex-grow">
          {this.renderContent()}
        </main>
        <footer className="md:absolute md:bottom-0 w-full p-4 mx-auto text-center">
          Data is from {this.state.dateUpdated.toDateString()} at{" "}
          {this.state.dateUpdated.toTimeString()}
        </footer>
      </div>
    );
  }
}

export default App;
