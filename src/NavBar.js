import React from 'react';

export default function NavBar(props){
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-transparent mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a className="md:text-2xl text-lg  font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
              UK Vaccine Counter
            </a>
            <button
              className="text-white cursor-pointer bg-blue-700 rounded px-3 py-2 m-1 lg:hidden focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              Filters 
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <div className="flex flex-row flex-wrap lg:ml-auto">
              <button
                className="bg-blue-700 rounded px-3 py-2 m-1"
                onClick={() => props.toggleCountry("uk")}
              >
                UK
              </button>
              <button
                className="bg-blue-700 rounded px-3 py-2 m-1"
                onClick={() => props.toggleCountry("eng")}
              >
                England
              </button>
              <button
                className="bg-blue-700 rounded px-3 py-2 m-1"
                onClick={() => props.toggleCountry("scot")}
              >
                Scotland
              </button>
              <button
                className="bg-blue-700 rounded px-3 py-2 m-1"
                onClick={() => props.toggleCountry("wal")}
              >
                Wales
              </button>
              <button
                className="bg-blue-700 rounded px-3 py-2 m-1"
                onClick={() => props.toggleCountry("nir")}
              >
                N.Ireland
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

