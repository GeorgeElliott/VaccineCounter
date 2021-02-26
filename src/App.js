import React from "react";

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
    debugger;
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
          <h2 className="text-center text-8xl leading-loose hover:animate-pulse">
            {Math.round(this.state.caseCount)}
          </h2>
          <p className="text-center">
            People recieved their first dose of Covid-19 vaccine (Estimated)
          </p>
          <p className="text-center">
            That is {this.state.percentageOfPopulation.toFixed(2)}% of the UKs
            population
          </p>
          <p className="text-center">
            <a
              className="underline"
              target="_blank"
              href="https://coronavirus.data.gov.uk/details/vaccinations"
            >
              We get our estimate using vaccination data from here
            </a>
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <p className="text-center text-8xl">Loading...</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="bg-gradient-to-tl from-blue-800 to-blue-500 text-white font-mono">
        <header className="absolute w-full mx-auto p-4 flex flex-row justify-center">
          <nav>
            <a href="/">
              <h1 className="text-center text-4xl font-bold">
                UK Vaccine Counter
              </h1>
            </a>
          </nav>
        </header>
        <main className=" flex h-screen flex-row  justify-center items-center">
          {this.renderContent()}
        </main>
        <footer className="absolute bottom-0 left-0 w-full mx-auto p-4 flex flex-row justify-center items-center">
          Data is from {this.state.dateUpdated.toDateString()} at{" "}
          {this.state.dateUpdated.toTimeString()}
        </footer>
      </div>
    );
  }
}

export default App;
