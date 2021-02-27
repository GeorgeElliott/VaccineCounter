import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <div className="w-full">
          <a href="/">
            <h1 className="text-center text-2xl lg:text-4xl font-bold uppercase">
              UK Vaccine Counter
            </h1>
          </a>
        </div>
        <div className="flex p-4 justify-center items-center invisible md:visible">
          <button className="bg-blue-700 rounded px-3 py-2 m-1">
            UK
          </button>
          <button className="bg-blue-700 rounded px-3 py-2 m-1">
            England
          </button>
          <button className="bg-blue-700 rounded px-3 py-2 m-1">
            Scotland
          </button>
          <button className="bg-blue-700 rounded px-3 py-2 m-1">
            Wales
          </button>
          <button className="bg-blue-700 rounded px-3 py-2 m-1">
            N.Ireland
          </button>
        </div>
        <div className="md:hidden mx-auto lg:pt-4 pr-4">
          <button
            id="nav-toggle"
            class="absolute text-white appearance-none focus:outline-none top-10 right-10"
          >
            <svg
              class="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </nav>
    );
  }
}

export default NavBar;
