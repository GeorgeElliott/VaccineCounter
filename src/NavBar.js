import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <a href="/">
          <h1 className="text-center text-4xl font-bold uppercase">
            UK Covid-19 Vaccine Counter
          </h1>
        </a>
      </nav>
    );
  }
}

export default NavBar;
