import React from "react";

export default function NavBar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [fullDoseToggle, setFullDoseToggled] = React.useState(false);

  const updateToggle = () => {
    props.toggleFullDose(!fullDoseToggle);
    setFullDoseToggled(!fullDoseToggle);
  };

  const renderButtons = () => {
    return (
      <>
        {props.countries.map((x) => {
          return (
            <button
              key={x.code}
              className={`rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg ${
                props.activeCountry !== x.code
                  ? "bg-blue-700 border-blue-800"
                  : "bg-blue-800 border-blue-900"
              }`}
              onClick={() => props.toggleCountry(x.code)}
            >
              {x.buttonText}
            </button>
          );
        })}
      </>
    );
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between navbar-expand-lg bg-transparent mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="md:text-2xl text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
              UK Vaccine Counter
            </div>
            <button
              className={`rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg lg:hidden ${
                !navbarOpen
                  ? "bg-blue-700 border-blue-800"
                  : "bg-blue-800 border-blue-900"
              }`}
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
            <div className="flex flex-row-reverse flex-wrap lg:ml-auto">
              {renderButtons()}
              <button
                className={`rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg ${
                  !fullDoseToggle
                    ? "bg-blue-700 border-blue-800"
                    : "bg-blue-800 border-blue-900"
                }`}
                onClick={(e) => updateToggle()}
              >
                Full Dose
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
