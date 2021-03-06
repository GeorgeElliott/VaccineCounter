import React from "react";
import ReactTooltip from "react-tooltip";

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
              Vaccine Counter - UK
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
              <ReactTooltip backgroundColor="#1d4ed8" />
              <a
                data-tip="My Github"
                target="_blank"
                rel="noreferrer"
                className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800"
                href="https://github.com/GeorgeElliott/VaccineCounter"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white fill-current text-center"
                >
                  <title>GitHub icon</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
