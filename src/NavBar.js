import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        {/* <div>
          <button className="bg-blue-700 rounded px-3 py-2 m-1">UK</button>
          <button className="bg-blue-700 rounded px-3 py-2 m-1">England</button>
          <button className="bg-blue-700 rounded px-3 py-2 m-1">Scotland</button>
          <button className="bg-blue-700 rounded px-3 py-2 m-1">Wales</button>
          <button className="bg-blue-700 rounded px-3 py-2 m-1">N.Ireland</button>
        </div> */}

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
